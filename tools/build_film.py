# -*- coding: utf-8 -*-
"""Generate GAIA Product Film.
Compiles the 9-scene product video from the official script
(source/docs/VIDEO-SCRIPT.md) and 1080p title cards and data plates.
Outputs:
  - assets/film/gaia-product-film.mp4 (Full ~3:30 film)
  - assets/film/gaia-product-film-15s.mp4 (15s executive cutdown: Scenes 3 + 5 + 9)
Includes warm minimal soundtrack synthesized to match the brand audio direction.
"""
import os
import subprocess
import sys
import tempfile

KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(KIT, "assets", "cards")
CHARTS_DIR = os.path.join(KIT, "assets", "charts")
FILM_DIR = os.path.join(KIT, "assets", "film")
os.makedirs(FILM_DIR, exist_ok=True)

# 9 Scenes from source/docs/VIDEO-SCRIPT.md
SCENES = [
    {
        "no": "01",
        "name": "THE PAIN",
        "duration": 25,
        "card": "gaia-card-01.svg",
        "vo": "Rent tracked in notebooks. Renewals remembered by memory. Receipts in three different inboxes. If one date slips, it costs the practice real money — and nobody meant for it to happen.",
        "kicker": "Oversight is the enemy.",
    },
    {
        "no": "02",
        "name": "ENTER GAIA",
        "duration": 25,
        "card": "gaia-card-02.svg",
        "vo": "This is GAIA — your entire property practice in one workspace. Expected rent. Money actually received. What's unpaid. Which estate carries the risk. Live, always current, one screen.",
        "kicker": "₦1,800,000 expected · ₦5,055,000 verified · ₦745,000 arrears",
    },
    {
        "no": "03",
        "name": "THE CASCADE",
        "duration": 30,
        "card": "gaia-card-03.svg",
        "vo": "One confirmation — and every dashboard, chart, and ledger tells the truth at the same moment. The tenant's balance updates. The estate's arrears drop. The portfolio recalculates. No spreadsheets. No 'whose number is right?' Just one truth.",
        "kicker": "745,000 → 545,000. Everywhere. Instantly.",
    },
    {
        "no": "04",
        "name": "NEVER MISS A DATE",
        "duration": 30,
        "card": "gaia-card-04.svg",
        "vo": "Every lease end. Every rent date. Every deadline — on a calendar, with the whole portfolio as a timeline. GAIA flags renewals ninety, sixty, thirty days out, automatically. The system remembers so nobody has to.",
        "kicker": "≤30 · ≤60 · ≤90 — automatic.",
    },
    {
        "no": "05",
        "name": "FIELD TO OFFICE IN TEN SECONDS",
        "duration": 30,
        "card": "gaia-card-05.svg",
        "vo": "A burst pipe at Unit A-04. The field agent opens his phone, logs it, snaps a photo. Ten seconds later it's in the PA's triage queue — classified, owned, dated. No WhatsApp. No paper. No 'I thought you saw it.'",
        "kicker": "Field → Triage. 10 seconds.",
    },
    {
        "no": "06",
        "name": "THE MONEY IS PROTECTED",
        "duration": 20,
        "card": "gaia-card-06.svg",
        "vo": "And the money? Field agents never see it — not hidden, simply never shared. Records are verified before they count. Access is granted per role, by the Principal alone. GAIA is built for a legal practice: evidence, audit trail, and boundaries.",
        "kicker": "Evidence, audit trail, boundaries.",
    },
    {
        "no": "07",
        "name": "GOOGLE, FLEXED",
        "duration": 25,
        "card": "gaia-card-07.svg",
        "vo": "It lives where your firm already lives. Deadlines drop onto Google Calendar with real reminders. Leases, receipts, and photos file into Google Drive — one folder per tenancy, linked to its record. Your filing cabinet, self-building.",
        "kicker": "Calendar ✓ Drive ✓ Gmail (soon) ✓",
    },
    {
        "no": "08",
        "name": "ASK GAIA ANYTHING",
        "duration": 15,
        "card": "gaia-card-08.svg",
        "vo": "And you can just ask. In plain English. The workspace answers — and behind it, Keplar's delivery agent keeps the knowledge current.",
        "kicker": "Ask. It answers.",
    },
    {
        "no": "09",
        "name": "CLOSE",
        "duration": 15,
        "card": "gaia-card-09.svg",
        "vo": "GAIA. Built for Gom Chambers. Every lease, every naira, every deadline — accounted for. This is your practice, running itself.",
        "kicker": "GAIA · Gom Chambers × Keplar Flow",
    },
]

def generate_scene_clip(scene, output_path):
    """Encode an individual scene clip at 1080p 25fps with smooth cross-fade."""
    card_path = os.path.join(CARDS_DIR, scene["card"])
    dur = scene["duration"]
    fade_in = 0.8
    fade_out_st = max(0.0, dur - 0.8)
    
    vf = f"fade=t=in:st=0:d={fade_in},fade=t=out:st={fade_out_st}:d=0.8"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", card_path,
        "-t", str(dur),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-pix_fmt", "yuv420p",
        "-r", "25",
        output_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def generate_ambient_audio(total_duration, output_audio_path):
    """Synthesize warm, minimal, ambient generative soundtrack.
    Matches script note: 'warm minimal, ducked under VO. No stock-footage offices'.
    Creates a warm chord pad (F-maj9 / D-min / C-add9 frequencies) with slow breathing filter.
    """
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", (
            f"aevalsrc="
            f"0.12*sin(2*PI*174.61*t)*sin(2*PI*0.1*t) + "
            f"0.08*sin(2*PI*220.00*t)*cos(2*PI*0.08*t) + "
            f"0.09*sin(2*PI*261.63*t) + "
            f"0.06*sin(2*PI*329.63*t)*sin(2*PI*0.05*t) + "
            f"0.04*sin(2*PI*392.00*t)"
            f":s=44100:d={total_duration}"
        ),
        "-af", "lowpass=f=800,afade=t=in:st=0:d=3,afade=t=out:st={}:d=4,volume=0.45".format(max(0, total_duration - 4)),
        "-c:a", "aac",
        "-b:a", "192k",
        output_audio_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def build_film(cutdown=False):
    """Build the product film."""
    film_name = "gaia-product-film-15s.mp4" if cutdown else "gaia-product-film.mp4"
    target_path = os.path.join(FILM_DIR, film_name)
    
    if cutdown:
        # 15s cutdown: Scenes 3, 5, 9 (5s each)
        selected_scenes = [
            dict(SCENES[2], duration=5),
            dict(SCENES[4], duration=5),
            dict(SCENES[8], duration=5),
        ]
    else:
        selected_scenes = SCENES
    
    total_dur = sum(s["duration"] for s in selected_scenes)
    print(f"Generating {'15s cutdown' if cutdown else 'Full 3:30 film'} ({total_dur}s) -> {target_path}...")
    
    with tempfile.TemporaryDirectory() as tmpdir:
        clip_paths = []
        for idx, sc in enumerate(selected_scenes):
            clip_file = os.path.join(tmpdir, f"clip_{idx:02d}.mp4")
            generate_scene_clip(sc, clip_file)
            clip_paths.append(clip_file)
            print(f"  [OK] Scene {sc['no']}: {sc['name']} ({sc['duration']}s)")
        
        # Concat list file
        concat_txt = os.path.join(tmpdir, "concat.txt")
        with open(concat_txt, "w") as f:
            for p in clip_paths:
                f.write(f"file '{p}'\n")
        
        merged_video = os.path.join(tmpdir, "merged.mp4")
        concat_cmd = [
            "ffmpeg", "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", concat_txt,
            "-c", "copy",
            merged_video
        ]
        subprocess.run(concat_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Synthesize ambient audio
        audio_file = os.path.join(tmpdir, "soundtrack.aac")
        generate_ambient_audio(total_dur, audio_file)
        
        # Mux audio and video
        final_cmd = [
            "ffmpeg", "-y",
            "-i", merged_video,
            "-i", audio_file,
            "-c:v", "copy",
            "-c:a", "aac",
            "-shortest",
            "-movflags", "+faststart",
            target_path
        ]
        subprocess.run(final_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
    size_mb = os.path.getsize(target_path) / (1024 * 1024)
    print(f"  ==> Created {target_path} ({size_mb:.2f} MB)")
    return target_path

def run():
    print("=== Generating GAIA Product Film Assets ===")
    full_film = build_film(cutdown=False)
    cutdown_film = build_film(cutdown=True)
    print("All product films generated successfully.")
    return full_film, cutdown_film

if __name__ == "__main__":
    run()
