from micropython import const
from language import language_id
from aisdks import sparkai
from scratch import runtime

DIALOGS_LENGTH = const(3)
brains = {}


def set_prompt(id, prompt):
    brains.setdefault(id, {})
    brains[id].setdefault("prompts", [])
    brains[id]["prompts"].append(prompt)


def clear_prompt(id):
    brains.setdefault(id, {})
    brains[id]["prompts"] = []


def get_language():
    if language_id == "en":
        return "英语"
    elif language_id == "jp":
        return "日语"
    elif language_id == "zh-Hans":
        return "简体中文"
    else:
        return "英语"


async def ask_brain(id, content):
    if not runtime.wifi_connected or not content:
        return ""

    brains.setdefault(id, {})
    prompts = brains[id].get("prompts", [])
    dialogs = brains[id].get("dialogs", [])
    result = brains[id].get("result", [])

    if len(dialogs) > DIALOGS_LENGTH:
        dialogs.pop(0)
    dialogs.append({"role": "user", "content": content})

    messages = [
        {
            "role": "system",
            "content": f"{'；'.join(prompts)}。请用{get_language()}回答，每次只回答一句话。",
        }
    ]
    messages.extend(dialogs)
    message = await sparkai.ask(messages)

    if len(dialogs) > DIALOGS_LENGTH:
        dialogs.pop(0)
    dialogs.append({"role": "assistant", content: message})
    brains[id]["result"] = message


def brain_answer(id):
    brains.setdefault(id, {})
    return brains[id]["result"] or ""
