import json
import re
from typing import Any


def _normalize_materials(raw: Any, max_items: int = 4) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, list):
        out = [str(x).strip() for x in raw if str(x).strip()]
        return out[:max_items]
    return []


def _item_from_dict(obj: dict[str, Any]) -> tuple[str, list[str]] | None:
    name = (
        obj.get("name")
        or obj.get("title")
        or obj.get("hobby")
        or obj.get("hobby_name")
    )
    if name is None:
        return None
    name_str = str(name).strip()
    if not name_str:
        return None
    mats = obj.get("materials") or obj.get("supplies") or obj.get("items") or obj.get("tools")
    return name_str, _normalize_materials(mats)


def parse_hobby_items(raw_content: str) -> tuple[list[tuple[str, list[str]]], bool]:
    """Return (name, materials) pairs with JSON-first fallback parsing."""
    text = raw_content.strip()
    if not text:
        return [], False

    def from_list(data: list[Any]) -> list[tuple[str, list[str]]]:
        out: list[tuple[str, list[str]]] = []
        for item in data:
            if isinstance(item, str):
                s = item.strip()
                if s:
                    out.append((s, []))
            elif isinstance(item, dict):
                parsed = _item_from_dict(item)
                if parsed:
                    out.append(parsed)
        return out

    try:
        data = json.loads(text)
        if isinstance(data, list):
            return from_list(data), False
    except json.JSONDecodeError:
        pass

    match = re.search(r"\[[\s\S]*\]", text)
    if match:
        try:
            data = json.loads(match.group(0))
            if isinstance(data, list):
                return from_list(data), True
        except json.JSONDecodeError:
            pass

    lines = [line.strip("-* 1234567890. \t") for line in text.splitlines()]
    hobbies = [line for line in lines if line]
    return [(h, []) for h in hobbies[:10]], True
