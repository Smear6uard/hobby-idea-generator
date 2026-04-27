import json
import re


def parse_hobbies(raw_content: str) -> tuple[list[str], bool]:
    """Return hobby names with JSON-first fallback parsing."""
    text = raw_content.strip()
    if not text:
        return [], False

    try:
        data = json.loads(text)
        if isinstance(data, list):
            hobbies = [str(item).strip() for item in data if str(item).strip()]
            return hobbies, False
    except json.JSONDecodeError:
        pass

    match = re.search(r"\[[\s\S]*\]", text)
    if match:
        try:
            data = json.loads(match.group(0))
            if isinstance(data, list):
                hobbies = [str(item).strip() for item in data if str(item).strip()]
                return hobbies, True
        except json.JSONDecodeError:
            pass

    lines = [line.strip("-* 1234567890. \t") for line in text.splitlines()]
    hobbies = [line for line in lines if line]
    return hobbies[:10], True
