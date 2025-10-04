# rules.py — natural follow-ups with smart heuristics (no ML, no extra deps)
import re

# ---------- Follow-ups ----------
FOLLOWUPS = {
    "short":   "Can you tell me a bit more about that?",
    "who":     "Who were you with?",
    "where":   "Where did this happen?",
    "when":    "Was it in the morning, afternoon, or evening?",
    "food":    "What did you eat or drink there?",
    "feel":    "How did you feel about it?",
    "detail":  "What is one small detail you remember—like a smell or a sound?",
    # special single-word prompts (sound more natural)
    "mealctx": "Was it part of breakfast, lunch, or a snack? Where were you?",
    "placectx":"Were you with anyone there?",
    "peoplectx":"Where did you meet or spend time together?",
    "timectx": "Where were you at that time, and who was with you?",
    "feelctx": "What happened that made you feel that way?",
    "actctx":  "Where did you do that, and who was with you?",
}

# ---------- Vocab (lowercase) ----------
FOOD = {
    "breakfast","lunch","dinner","brunch","snack","meal","supper",
    "food","dish","curry","soup","stew","salad","bread","rice","noodles","pasta",
    "roti","naan","paratha","chapati","dal","lentil","dumpling",
    "chicken","beef","mutton","goat","lamb","fish","shrimp","prawn","egg","tofu","paneer",
    "pizza","burger","sandwich","sub","wrap","taco","burrito","hotdog","fries",
    "cake","cookie","biscuit","brownie","icecream","ice-cream","ice","cream","pudding","kheer","payesh","sweet","dessert","pastry",
    "apple","banana","mango","orange","grape","berry","watermelon","pineapple","guava",
    "carrot","potato","tomato","spinach","cabbage","cauliflower","okra",
    "water","milk","tea","coffee","latte","espresso","mocha","chai",
    "juice","lemonade","smoothie",
    "soda","cola","coke","pepsi","sprite","fanta","7up","mountaindew","dew",
    "biryani","biriyani","khichuri","polao","bhorta","haleem","nihari","kachchi",
}

PEOPLE = {
    "mother","mom","mum","ma","amma","ammi",
    "father","dad","baba","abbu","abba",
    "parents","guardian","caregiver",
    "sister","brother","sis","bro","cousin","aunt","uncle",
    "grandma","grandpa","grandmother","grandfather","nana","dadi","dadu","nanu",
    "wife","husband","partner","fiance","boyfriend","girlfriend",
    "son","daughter","child","baby","kids","children","family","relatives",
    "friend","friends","bestie","buddy","classmate","roommate","neighbor",
    "teacher","professor","coach","doctor","nurse","therapist","driver","shopkeeper","waiter","police","officer",
    "colleague","coworker","boss","manager","team",
}

PLACES = {
    "home","house","flat","apartment","room","kitchen","bedroom","livingroom","balcony","yard","garden","rooftop",
    "school","college","university","class","classroom","library","lab","campus","dorm","hostel",
    "office","work","factory","site","warehouse","workshop","store","shop","market","bazaar","mall",
    "restaurant","cafe","coffeehouse","canteen","foodcourt",
    "park","playground","field","stadium","gym","pool","beach","lake","river","hill","forest",
    "temple","mosque","church","shrine","monastery","graveyard","cemetery",
    "hospital","clinic","pharmacy","bank","atm","postoffice","policestation",
    "city","downtown","uptown","village","town","neighborhood","street","road","highway","bridge",
    "station","busstop","bus","railway","train","platform","airport","terminal","uber","cab","taxi",
    "theater","cinema","movie","museum","gallery","zoo","aquarium",
    "party","wedding","ceremony","festival","fair","concert","event",
}

EMOTION = {
    "happy","joy","joyful","glad","excited","proud","calm","relaxed","relief","relieved",
    "sad","upset","down","depressed","gloomy","lonely","homesick",
    "angry","mad","annoyed","frustrated","irritated",
    "scared","afraid","nervous","anxious","worried","tense","shy",
    "surprised","shocked","confused","bored","tired","sleepy","hungry","thirsty","sick","ill","pain",
}

TIMEWORDS = {
    "morning","afternoon","evening","night","midnight","noon",
    "yesterday","today","tonight","tomorrow","weekend","weekday",
    "monday","tuesday","wednesday","thursday","friday","saturday","sunday",
    "january","february","march","april","may","june","july","august","september","october","november","december",
    "summer","winter","spring","autumn","fall","before","after","later","earlier","now","soon","recently","ago",
}

ACTIVITIES = {
    "walk","walking","run","running","jog","jogging","swim","swimming","cycle","cycling","bike","biking",
    "cricket","football","soccer","basketball","tennis","badminton","volleyball","tabletennis","pingpong",
    "study","studying","read","reading","write","writing","draw","drawing","paint","painting",
    "cook","cooking","bake","baking","clean","cleaning","wash","washing","laundry","shop","shopping",
    "pray","praying","meditate","meditation","exercise","workout","yoga","stretch",
    "game","gaming","play","playing","movie","watch","watching","listen","listening","music","song","songs",
    "travel","trip","visit","visited","tour","hike","hiking","picnic",
}

# ---------- Helpers ----------
def _tokens(s: str):
    s = (s or "").lower()
    s = re.sub(r"[^a-z0-9\s-]", " ", s)
    s = s.replace("ice cream","ice-cream")
    toks = [w for w in s.split() if w]
    return toks

def _has(tokens, vocab):          return any(t in vocab for t in tokens)
def _only_one(tokens, vocab):     return len([t for t in tokens if t in vocab]) == 1

# ---------- Core logic ----------
def next_prompt(text: str, lang: str = "en"):
    toks = _tokens(text)
    n = len(toks)

    has_food   = _has(toks, FOOD)
    has_people = _has(toks, PEOPLE)
    has_place  = _has(toks, PLACES)
    has_time   = _has(toks, TIMEWORDS)
    has_feel   = _has(toks, EMOTION)
    has_act    = _has(toks, ACTIVITIES)

    # --- Single-word natural cases (feel human) ---
    if n == 1:
        w = toks[0]
        if w in FOOD:    return FOLLOWUPS["mealctx"],  "meal_context"
        if w in PLACES:  return FOLLOWUPS["placectx"], "place_context"
        if w in PEOPLE:  return FOLLOWUPS["peoplectx"],"people_context"
        if w in TIMEWORDS:return FOLLOWUPS["timectx"], "time_context"
        if w in EMOTION: return FOLLOWUPS["feelctx"],  "feel_context"
        if w in ACTIVITIES:return FOLLOWUPS["actctx"], "activity_context"
        # unknown single word
        return FOLLOWUPS["short"], "short"

    # --- Short utterances: still try to be specific if possible ---
    if n < 5:
        if has_food:   return FOLLOWUPS["mealctx"], "meal_context"
        if has_people:return FOLLOWUPS["where"],    "people"
        if has_place: return FOLLOWUPS["who"],      "place"
        if has_time:  return FOLLOWUPS["timectx"],  "time_context"
        if has_feel:  return FOLLOWUPS["feelctx"],  "feel_context"
        if has_act:   return FOLLOWUPS["actctx"],   "activity_context"
        return FOLLOWUPS["short"], "short"

    # --- Multi-signal logic: ask for the missing piece ---
    # Narrative slots we want filled: who, where, when, detail/feel
    # Priorities depend on what we already have.

    # If we have a place but no people → ask "who"
    if has_place and not has_people:
        return FOLLOWUPS["who"], "who"

    # If we have people but no place → ask "where"
    if has_people and not has_place:
        return FOLLOWUPS["where"], "where"

    # If we have both people & place but no time → ask "when"
    if has_people and has_place and not has_time:
        return FOLLOWUPS["when"], "when"

    # If we mentioned food but we don't know where → ask "where"
    if has_food and not has_place:
        return FOLLOWUPS["where"], "where_from_food"

    # If we mentioned food & place but not people → ask "who"
    if has_food and has_place and not has_people:
        return FOLLOWUPS["who"], "who_from_food_place"

    # If we have an activity but missing place → ask "where"
    if has_act and not has_place:
        return FOLLOWUPS["where"], "where_from_activity"

    # If we have most facts, elicit a sensory detail or feeling
    if (has_people or has_place or has_time or has_food or has_act) and not has_feel:
        return FOLLOWUPS["detail"], "detail"

    # Generic sensible fallbacks
    if has_food:   return FOLLOWUPS["food"],   "food"
    if has_people: return FOLLOWUPS["where"],  "people"
    if has_place:  return FOLLOWUPS["who"],    "place"
    if has_time:   return FOLLOWUPS["when"],   "when"
    if has_feel:   return FOLLOWUPS["feel"],   "feel"
    if has_act:    return FOLLOWUPS["where"],  "activity"

    # Nothing obvious
    return FOLLOWUPS["feel"], "feel"
