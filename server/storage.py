import time
import secrets

# In-memory storage (replace with a database later)
DB = {
    "patients": {},   # code -> {name, lang, created_at}
    "sessions": {}    # code -> {entries: [...], suggestions: [...]}
}

def new_code():
    return secrets.token_hex(3).upper()  # e.g. "A1B2C3"

def create_or_get_patient(name, lang):
    # If same name+lang exists, reuse code
    for code, p in DB["patients"].items():
        if p["name"].lower() == name.lower() and p["lang"] == lang:
            return code, False
    code = new_code()
    DB["patients"][code] = {"name": name, "lang": lang, "created_at": int(time.time())}
    DB["sessions"][code] = {"entries": [], "suggestions": []}
    return code, True

def add_entry(code, payload):
    DB["sessions"][code]["entries"].append({**payload, "ts": int(time.time())})

def add_suggestion(code, text, translated=None):
    DB["sessions"][code]["suggestions"].append({
        "text": text,
        "translated": translated,
        "ts": int(time.time())
    })

def get_session(code):
    return DB["sessions"].get(code)

def get_patient(code):
    return DB["patients"].get(code)
