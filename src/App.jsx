import { useState } from "react";

const PHASES = [
  {
    name: "Foundation",
    weeks: "Weeks 1–4",
    subtitle: "Build base strength & mobility",
    color: "#4A7C59",
    accent: "#6BAF7E",
    schedule: "3 days/week • Full body • Rest 48hrs between",
    sets: "2–3 sets × 10–15 reps (or 20–30s holds)",
    rule: "Move on when you can complete 3×15 with perfect form",
    muscles: {
      chest: [
        { name: "Incline Push-Ups", desc: "Hands on counter or sturdy table. Full range of motion, chest to surface", mobility: "Opens chest & shoulders through loaded stretch", sets: "3×12", icon: "📐" },
        { name: "Knee Push-Ups", desc: "Knees on ground, hands shoulder-width. Lower chest to floor with 3s negative", mobility: "Builds pressing foundation + scapular control", sets: "3×10", icon: "🔻" },
        { name: "Banded Chest Press", desc: "Band behind back, press forward at chest height. Squeeze at full extension", mobility: "Trains horizontal push with constant tension", sets: "3×12", icon: "🎗️" },
      ],
      shoulders: [
        { name: "Band Pull-Aparts", desc: "Hold band at arm's length, pull apart to chest. Squeeze shoulder blades", mobility: "Opens chest & strengthens rear delts for posture", sets: "3×15", icon: "↔️" },
        { name: "Banded Lateral Raises", desc: "Stand on band, raise arms to sides until parallel. Control the descent", mobility: "Builds shoulder abduction strength & stability", sets: "3×12", icon: "🦅" },
        { name: "Wall Slides", desc: "Back and arms against wall, slide arms up overhead keeping contact. Slow & controlled", mobility: "Restores overhead mobility & scapular movement", sets: "3×10", icon: "🧱" },
      ],
      back: [
        { name: "Band Rows", desc: "Band anchored at waist height, pull elbows back squeezing shoulder blades. 2s hold", mobility: "Builds retraction strength to counter rounded posture", sets: "3×12", icon: "🚣" },
        { name: "Superman Holds", desc: "Lying face down, lift arms and legs off ground. Hold 3s at top", mobility: "Spinal extension endurance + posterior chain activation", sets: "3×10", icon: "🦸" },
        { name: "Band Face Pulls", desc: "Band anchored high, pull to face with elbows high. External rotate at end", mobility: "Rear delt + rotator cuff health & shoulder mobility", sets: "3×15", icon: "🎯" },
      ],
      biceps: [
        { name: "Banded Curls", desc: "Stand on band, curl with palms up. Squeeze at top, 3s negative", mobility: "Builds bicep strength + elbow flexion endurance", sets: "3×12", icon: "💪" },
        { name: "Isometric Hold Curls", desc: "Band curl to 90°, hold for time. Fight the band pulling you down", mobility: "Tendon conditioning + static strength base", sets: "3×20s", icon: "⏸️" },
        { name: "Doorframe Rows", desc: "Hold doorframe edges, lean back, pull chest to frame. Feet close to door", mobility: "Bodyweight bicep/back combo + grip strength", sets: "3×10", icon: "🚪" },
      ],
      triceps: [
        { name: "Bench Dips (bent knee)", desc: "Hands on chair behind you, feet flat, lower and press. Keep hips close to chair", mobility: "Builds pressing strength + shoulder extension flexibility", sets: "3×10", icon: "🪑" },
        { name: "Banded Pushdowns", desc: "Band anchored above head, push down until arms straight. Squeeze triceps", mobility: "Isolates triceps through full elbow extension", sets: "3×12", icon: "⬇️" },
        { name: "Diamond Knee Push-Ups", desc: "Hands together in diamond shape, knees down. Lower chest to hands", mobility: "Narrow pressing pattern for tricep emphasis", sets: "3×8", icon: "🔷" },
      ],
      abs: [
        { name: "Dead Bugs", desc: "Lying on back, extend opposite arm/leg while keeping lower back pressed down", mobility: "Teaches pelvic control & spinal awareness", sets: "3×10 each side", icon: "🪲" },
        { name: "Bird Dogs", desc: "On all fours, extend opposite arm & leg. Hold 2s at top", mobility: "Builds anti-rotation stability & hip extension", sets: "3×10 each side", icon: "🐕" },
        { name: "Forearm Plank", desc: "Hold rigid line from head to heels. Squeeze glutes & brace abs", mobility: "Builds total-body isometric endurance", sets: "3×20–30s", icon: "🧱" },
      ],
      obliques: [
        { name: "Side Plank (knee)", desc: "From knees, stack hips and hold. Top arm to ceiling", mobility: "Lateral core stability + hip stacking awareness", sets: "3×15s each", icon: "📏" },
        { name: "Dead Bug Rotation", desc: "Dead bug but reach opposite hand past opposite knee, adding a twist", mobility: "Anti-rotation + thoracic mobility", sets: "3×8 each", icon: "🌀" },
        { name: "Pallof Hold", desc: "Band at chest height, press out and hold. Don't let it rotate you", mobility: "Teaches core to resist rotational forces", sets: "3×15s each", icon: "🛡️" },
      ],
      glutes: [
        { name: "Glute Bridges", desc: "Feet flat, drive hips up squeezing glutes hard at top. Slow 3s down", mobility: "Opens hip flexors through end-range extension", sets: "3×15", icon: "🌉" },
        { name: "Clamshells", desc: "Side-lying, feet together, open top knee. Add band above knees when easy", mobility: "Activates deep external rotators for hip health", sets: "3×15 each", icon: "🐚" },
        { name: "Frog Pumps", desc: "Soles together, knees wide, drive hips up using glutes", mobility: "Trains glutes in deep hip external rotation", sets: "3×15", icon: "🐸" },
      ],
      quads: [
        { name: "Wall Sit", desc: "Back against wall, thighs parallel to floor. Hold for time", mobility: "Isometric quad endurance + knee stability", sets: "3×20–30s", icon: "🏰" },
        { name: "Assisted Squat", desc: "Hold doorframe or sturdy object, squat deep with control. Focus on depth", mobility: "Builds squat depth + ankle/hip flexibility", sets: "3×12", icon: "🤝" },
        { name: "Step-Ups", desc: "Step onto sturdy chair or step. Drive through heel, control descent", mobility: "Single-leg quad strength + hip flexion range", sets: "3×10 each", icon: "🪜" },
      ],
      hamstrings: [
        { name: "Walkout Glute Bridge", desc: "Bridge up, walk feet out 4 steps, walk back, lower. Feel hamstrings engage as feet get further", mobility: "Progressive hamstring loading through range", sets: "3×8", icon: "🚶" },
        { name: "Standing Band Leg Curl", desc: "Band around ankle, anchored low. Curl heel to glute standing on one leg", mobility: "Single-leg balance + hamstring activation", sets: "3×12 each", icon: "🦵" },
        { name: "Supine Hamstring Stretch", desc: "Lying on back, band around foot, straighten leg toward ceiling. Hold 30s", mobility: "Direct hamstring flexibility work", sets: "3×30s each", icon: "🧘" },
      ],
      calves: [
        { name: "Double Calf Raises", desc: "Stand on edge of step, lower heels below, then rise to full extension. 2s hold at top", mobility: "Full ankle range of motion under load", sets: "3×15", icon: "🦶" },
        { name: "Seated Calf Raises", desc: "Sit with knees bent, balls of feet on a book/step. Raise and lower heels", mobility: "Targets soleus + ankle mobility in flexed knee", sets: "3×15", icon: "🪑" },
        { name: "Wall Calf Stretch", desc: "Lean into wall, back leg straight, heel down. Hold 30s each side", mobility: "Essential ankle dorsiflexion flexibility", sets: "3×30s each", icon: "🧱" },
      ],
    },
  },
  {
    name: "Build",
    weeks: "Weeks 5–8",
    subtitle: "Increase load & single-limb work",
    color: "#2E5D8A",
    accent: "#4A8AC2",
    schedule: "3–4 days/week • Upper/Lower split recommended",
    sets: "3 sets × 10–12 reps",
    rule: "Progress when 3×12 is comfortable with 1–2 reps in reserve",
    muscles: {
      chest: [
        { name: "Full Push-Ups", desc: "Toes on ground, rigid body. Lower until chest nearly touches, 3s descent", mobility: "Full bodyweight pressing with scapular freedom", sets: "3×10", icon: "⬆️" },
        { name: "Wide Push-Ups", desc: "Hands wider than shoulders. Deeper chest stretch at bottom", mobility: "Greater pec stretch + shoulder flexibility", sets: "3×10", icon: "🦋" },
        { name: "Banded Chest Fly", desc: "Band behind back, arms out wide, bring hands together in front. Squeeze", mobility: "Horizontal adduction through full range", sets: "3×12", icon: "🤲" },
      ],
      shoulders: [
        { name: "Pike Push-Ups", desc: "Hips high in inverted V, lower head toward ground. Press back up", mobility: "Builds overhead pressing strength + shoulder flexion", sets: "3×8", icon: "⛰️" },
        { name: "Banded Overhead Press", desc: "Stand on band, press overhead to lockout. Control the descent", mobility: "Full shoulder flexion range under resistance", sets: "3×10", icon: "🏋️" },
        { name: "YTW Raises", desc: "Lying face down, raise arms in Y, T, then W positions. 3 reps of each = 1 set", mobility: "Trains all rotator cuff positions + scapular health", sets: "3×5 cycles", icon: "🔤" },
      ],
      back: [
        { name: "Doorframe Rows", desc: "Lean back holding doorframe, pull chest to frame. Walk feet closer to increase difficulty", mobility: "Horizontal pull + scapular retraction strength", sets: "3×12", icon: "🚪" },
        { name: "Band Lat Pulldowns", desc: "Band anchored high, kneel and pull down to chest with wide grip", mobility: "Mimics lat pulldown — vertical pulling power", sets: "3×12", icon: "📥" },
        { name: "Reverse Snow Angels", desc: "Lying face down, arms at sides, sweep arms overhead and back. Keep off ground", mobility: "Full posterior shoulder + back mobility arc", sets: "3×10", icon: "👼" },
      ],
      biceps: [
        { name: "Banded Hammer Curls", desc: "Stand on band, curl with neutral grip (palms facing). Squeeze forearms too", mobility: "Brachialis + forearm development", sets: "3×12", icon: "🔨" },
        { name: "Concentration Curls", desc: "Seated, elbow on inner thigh, curl band with full range. Peak squeeze", mobility: "Maximum bicep isolation through full ROM", sets: "3×10 each", icon: "🎯" },
        { name: "Chin-Up Negatives", desc: "Jump to top of chin-up, lower yourself as slowly as possible (5–8s)", mobility: "Eccentric bicep + lat strength toward full chin-up", sets: "3×4", icon: "📉" },
      ],
      triceps: [
        { name: "Bench Dips (straight leg)", desc: "Legs extended straight, lower and press. Go deep if shoulders allow", mobility: "Increased load + deeper shoulder extension", sets: "3×10", icon: "🦿" },
        { name: "Banded Overhead Extension", desc: "Band anchored low behind you, extend arms overhead. Full tricep stretch", mobility: "Long head tricep stretch under load", sets: "3×12", icon: "🙌" },
        { name: "Close-Grip Push-Ups", desc: "Hands directly under shoulders, elbows tight to body. Full range", mobility: "Tricep-dominant pressing pattern", sets: "3×10", icon: "🤏" },
      ],
      abs: [
        { name: "Hollow Body Hold", desc: "Lying flat, lift arms overhead and legs off ground. Keep lower back glued to floor", mobility: "Full anterior chain integration & body control", sets: "3×20–30s", icon: "🌙" },
        { name: "Banded Pallof Press", desc: "Band at chest height, press out and hold. Resist rotation", mobility: "Anti-rotation strength transfers to all lifts", sets: "3×10 each", icon: "💪" },
        { name: "Lying Leg Raises", desc: "Slow controlled raises, hands under hips. Lower with 3s negative", mobility: "Hip flexor mobility with eccentric ab loading", sets: "3×10", icon: "📐" },
      ],
      obliques: [
        { name: "Side Plank (full)", desc: "From feet, stack body straight. Top arm to ceiling. Hold", mobility: "Full lateral chain engagement + hip stability", sets: "3×20s each", icon: "📏" },
        { name: "Banded Woodchops", desc: "Band low, rotate and chop upward across body. Control the return", mobility: "Rotational power + thoracic mobility", sets: "3×10 each", icon: "🪓" },
        { name: "Bicycle Crunches", desc: "Slow and controlled — 2s per rep. Elbow to opposite knee", mobility: "Rotational strength + hip flexor engagement", sets: "3×10 each", icon: "🚲" },
      ],
      glutes: [
        { name: "Single-Leg Glute Bridge", desc: "One foot planted, other leg extended. Drive through heel", mobility: "Addresses imbalances between sides", sets: "3×10 each", icon: "🦩" },
        { name: "Banded Squats", desc: "Band above knees, push knees out throughout. Full depth with control", mobility: "Deep squat mobility with glute med activation", sets: "3×12", icon: "🏋️" },
        { name: "Banded Kickbacks", desc: "On all fours, band around foot, drive leg back. Full hip extension", mobility: "End-range hip extension strength", sets: "3×12 each", icon: "🦶" },
      ],
      quads: [
        { name: "Bodyweight Squat", desc: "Full depth, controlled tempo. 3s down, pause at bottom, drive up", mobility: "Deep squat patterning with mobility emphasis", sets: "3×12", icon: "⬇️" },
        { name: "Reverse Lunges", desc: "Step back into lunge, knee barely touches ground. Alternate legs", mobility: "Hip flexor stretch + quad loading per leg", sets: "3×10 each", icon: "🔙" },
        { name: "Banded Leg Extensions", desc: "Seated, band around ankle anchored behind. Extend knee fully. Squeeze", mobility: "Isolated quad contraction + knee health", sets: "3×12 each", icon: "🦵" },
      ],
      hamstrings: [
        { name: "Single-Leg RDL", desc: "Bodyweight, hinge at hips on one leg. Touch ground if flexible enough", mobility: "Deep hamstring stretch under load + balance", sets: "3×8 each", icon: "⚖️" },
        { name: "Slider Leg Curls", desc: "Lying on back, heels on towel/slider, bridge up, curl heels in", mobility: "Trains hamstrings at knee & hip simultaneously", sets: "3×8", icon: "🛷" },
        { name: "Banded Good Mornings", desc: "Band under feet and behind neck, hinge forward with flat back", mobility: "Loaded hamstring/posterior chain flexibility", sets: "3×12", icon: "🌅" },
      ],
      calves: [
        { name: "Single-Leg Calf Raise", desc: "One foot on step edge, full range. Lower heel deep, rise high", mobility: "Unilateral calf strength + ankle stability", sets: "3×10 each", icon: "1️⃣" },
        { name: "Jumping Calf Raises", desc: "Small hops staying on balls of feet. Focus on calf contraction, not height", mobility: "Plyometric tendon conditioning + power", sets: "3×15", icon: "⬆️" },
        { name: "Downward Dog Calf Walk", desc: "In downward dog, alternate pressing heels to ground. Pedal slowly", mobility: "Dynamic calf + hamstring stretch combo", sets: "3×10 each", icon: "🐕" },
      ],
    },
  },
  {
    name: "Strength",
    weeks: "Weeks 9–12",
    subtitle: "Challenge stability & control",
    color: "#8B4513",
    accent: "#C4722F",
    schedule: "4 days/week • Upper/Lower or Push/Pull/Legs",
    sets: "3–4 sets × 8–12 reps",
    rule: "Progress when form is rock solid and movement feels controlled",
    muscles: {
      chest: [
        { name: "Decline Push-Ups", desc: "Feet elevated on chair. Shifts more weight to chest and shoulders", mobility: "Increased pressing load + shoulder stability", sets: "3×10", icon: "📈" },
        { name: "Archer Push-Ups", desc: "Wide stance, shift weight to one arm while keeping other straight. Alternate", mobility: "Builds toward one-arm push-up + chest stretch", sets: "3×6 each", icon: "🏹" },
        { name: "Banded Push-Up", desc: "Band across back and under hands. Push-up against band resistance", mobility: "Overloads lockout + accelerating push", sets: "3×10", icon: "🎗️" },
      ],
      shoulders: [
        { name: "Elevated Pike Push-Ups", desc: "Feet on chair, hips high, head toward floor. Mimics overhead press", mobility: "Near-vertical pressing for overhead strength", sets: "3×8", icon: "🏔️" },
        { name: "Banded Face Pull + ER", desc: "Pull band to face, then externally rotate hands overhead. Slow", mobility: "Rotator cuff + shoulder health in one combo", sets: "3×10", icon: "🔄" },
        { name: "Wall Handstand Hold", desc: "Kick up to wall, belly facing wall. Hold rigid with straight arms", mobility: "Full overhead position + wrist/shoulder conditioning", sets: "3×15–30s", icon: "🤸" },
      ],
      back: [
        { name: "Inverted Rows", desc: "Under a sturdy table, pull chest to table edge. Keep body straight", mobility: "Horizontal pulling at challenging angle", sets: "3×10", icon: "📊" },
        { name: "Chin-Up Progression", desc: "Use band for assist if needed, or do negatives. Full range", mobility: "Vertical pull + bicep + lat strength combined", sets: "3×5–8", icon: "⬆️" },
        { name: "Band Pull-Apart (behind neck)", desc: "Pull band apart behind head. Opens front of shoulders powerfully", mobility: "Extreme chest opener + rear delt/rhomboid work", sets: "3×12", icon: "🔓" },
      ],
      biceps: [
        { name: "Chin-Ups (full)", desc: "Palms facing you, pull chin over bar. Full dead hang at bottom", mobility: "Peak bodyweight bicep exercise + lat engagement", sets: "3×5–8", icon: "🏗️" },
        { name: "Banded 21s", desc: "7 bottom-half curls, 7 top-half curls, 7 full curls. No rest between", mobility: "Time under tension through every angle", sets: "3×21", icon: "2️⃣" },
        { name: "Bodyweight Curl (low bar)", desc: "Hang from low bar, curl body toward hands. Adjust foot position for difficulty", mobility: "Bodyweight bicep loading — scales infinitely", sets: "3×8", icon: "🔗" },
      ],
      triceps: [
        { name: "Diamond Push-Ups", desc: "Full body, hands in diamond. Lower chest to hands. Hardest push-up variation for triceps", mobility: "Peak push-up tricep loading + wrist flexibility", sets: "3×10", icon: "💎" },
        { name: "Bodyweight Skull Crushers", desc: "Hands on table edge, lower forehead to edge by bending elbows. Press back up", mobility: "Intense tricep isolation using body angle", sets: "3×8", icon: "💀" },
        { name: "Band Kickbacks", desc: "Hinged forward, extend arm back against band resistance. Squeeze at lockout", mobility: "Long head tricep + posterior shoulder work", sets: "3×12 each", icon: "🦵" },
      ],
      abs: [
        { name: "Ab Wheel / Towel Rollouts", desc: "Kneel, roll forward on wheel or towel on smooth floor. Only go as far as you can pull back", mobility: "Extreme anti-extension + shoulder mobility", sets: "3×8", icon: "🎡" },
        { name: "L-Sit Progression", desc: "Hands on floor or blocks, lift legs. Start tucked, work toward straight legs", mobility: "Compression strength + hamstring flexibility required", sets: "3×10–20s", icon: "🅛" },
        { name: "Hanging Knee Raises", desc: "From a bar, bring knees to chest. Control the swing", mobility: "Grip endurance + hip flexion + spinal decompression", sets: "3×10", icon: "🦇" },
      ],
      obliques: [
        { name: "Side Plank + Hip Dip", desc: "Full side plank, dip hip to ground and raise. Control the arc", mobility: "Dynamic lateral core + hip mobility", sets: "3×10 each", icon: "〰️" },
        { name: "Banded Pallof Press + Rotate", desc: "Press out, then rotate torso against band. Return with control", mobility: "Anti-rotation + active rotation combo", sets: "3×8 each", icon: "🔄" },
        { name: "Copenhagen Plank", desc: "Side plank with top foot on bench, bottom leg hanging. Hold", mobility: "Adductor + oblique integration — injury proofing", sets: "3×15s each", icon: "🇩🇰" },
      ],
      glutes: [
        { name: "Banded Hip Thrusts", desc: "Shoulders on bench/couch, band above knees, heavy squeeze at top", mobility: "Peak glute contraction in full hip extension", sets: "3×12", icon: "🔥" },
        { name: "Bulgarian Split Squat", desc: "Rear foot elevated on chair, deep lunge. 3s descent", mobility: "Deep hip flexor stretch + single-leg glute power", sets: "3×10 each", icon: "🇧🇬" },
        { name: "Pistol Squat Negatives", desc: "Stand on one leg, sit down slowly to a chair. Use less support over time", mobility: "Builds toward full pistol with ankle/hip mobility", sets: "3×5 each", icon: "🔫" },
      ],
      quads: [
        { name: "Banded Squat", desc: "Band above knees for abduction resistance. Full depth, slow tempo", mobility: "Deep squat + glute med firing for knee health", sets: "3×12", icon: "🏋️" },
        { name: "Walking Lunges", desc: "Continuous forward lunges. Long stride for hip flexor stretch", mobility: "Dynamic hip flexor mobility + quad/glute power", sets: "3×10 each", icon: "🚶" },
        { name: "Sissy Squat Negatives", desc: "Hold onto support, lean back bending knees, heels rise. Slow eccentric", mobility: "Extreme quad stretch under load + knee conditioning", sets: "3×6", icon: "🎭" },
      ],
      hamstrings: [
        { name: "Single-Leg Slider Curl", desc: "Same as slider curl but one leg. Bridge and curl", mobility: "Advanced single-leg hamstring strength", sets: "3×6 each", icon: "⚡" },
        { name: "Nordic Curl Negatives", desc: "Kneel, feet anchored, slowly lower chest to ground (5–8s). Push back up", mobility: "Extreme eccentric hamstring loading at length", sets: "3×5", icon: "🏔️" },
        { name: "Band-Assisted Nordic Curl", desc: "Band around chest anchored above, perform full Nordic with band support", mobility: "Builds toward full Nordic — top-tier hamstring exercise", sets: "3×6", icon: "🎗️" },
      ],
      calves: [
        { name: "Eccentric Single-Leg Calf", desc: "Rise on two feet, lower on one foot over 5 seconds. Deep stretch", mobility: "Eccentric overload + achilles tendon health", sets: "3×8 each", icon: "⏬" },
        { name: "Banded Dorsiflexion", desc: "Band around forefoot pulling forward, pull toes toward shin against resistance", mobility: "Trains tibialis anterior — prevents shin splints", sets: "3×12 each", icon: "🔼" },
        { name: "Depth Drop Calf Raise", desc: "Step off small ledge, land on balls of feet, immediately rise to calf raise", mobility: "Reactive calf strength + plyometric tendon prep", sets: "3×8", icon: "💥" },
      ],
    },
  },
  {
    name: "Advanced",
    weeks: "Weeks 13–16+",
    subtitle: "Skill moves & peak bodyweight strength",
    color: "#6B2D5B",
    accent: "#A04D8A",
    schedule: "4–5 days/week • Dedicated mobility day recommended",
    sets: "3–4 sets × 5–10 reps",
    rule: "These are ongoing goals — keep refining form and adding reps",
    muscles: {
      chest: [
        { name: "One-Arm Push-Up Neg.", desc: "Lower on one arm (5s), push up with two. Keep hips square", mobility: "Extreme unilateral pressing + anti-rotation", sets: "3×4 each", icon: "☝️" },
        { name: "Plyo Push-Ups", desc: "Explosive push-up with hands leaving the ground. Clap optional", mobility: "Power development + fast-twitch fiber recruitment", sets: "3×6", icon: "💥" },
        { name: "Ring/Bar Dips", desc: "Full bodyweight dips on parallel bars or rings. Deep stretch at bottom", mobility: "Full pressing strength + shoulder extension ROM", sets: "3×8", icon: "🔘" },
      ],
      shoulders: [
        { name: "Pike Push-Up (feet high)", desc: "Feet on wall, body nearly vertical. Deep pike push-up toward handstand push-up", mobility: "Near-full overhead pressing at bodyweight", sets: "3×6", icon: "🔝" },
        { name: "Wall HSPU Negatives", desc: "Handstand on wall, lower head to floor slowly (5s). Kick down and reset", mobility: "Eccentric overhead strength toward full HSPU", sets: "3×4", icon: "🤸" },
        { name: "Full Handstand Push-Up", desc: "Wall-assisted handstand, lower head to floor and press back up", mobility: "Ultimate bodyweight overhead press", sets: "3×3–5", icon: "👑" },
      ],
      back: [
        { name: "Pull-Ups", desc: "Overhand grip, full dead hang to chin over bar. Wide or shoulder-width", mobility: "King of bodyweight back exercises + lat power", sets: "3×5–8", icon: "🏗️" },
        { name: "Archer Rows", desc: "Under table, shift weight to one arm while other stays straight. Alternate", mobility: "Builds toward one-arm pulling", sets: "3×6 each", icon: "🏹" },
        { name: "Front Lever Tuck Hold", desc: "Hang from bar, pull body horizontal with knees tucked. Hold rigid", mobility: "Elite back/core integration + shoulder stability", sets: "3×10–15s", icon: "🦎" },
      ],
      biceps: [
        { name: "Weighted Chin-Ups", desc: "Chin-ups with band adding resistance (around feet and over neck). Full ROM", mobility: "Progressive overload on bodyweight curl pattern", sets: "3×5", icon: "⚡" },
        { name: "Pelican Curl Negatives", desc: "On rings/bands, arms behind body, slowly curl body forward. Extreme bicep", mobility: "Extreme long-head stretch under load", sets: "3×4", icon: "🦩" },
        { name: "One-Arm Band Curl", desc: "Heavy band, one arm, full range curl with strict form. No swing", mobility: "Peak unilateral bicep strength", sets: "3×8 each", icon: "🎯" },
      ],
      triceps: [
        { name: "Tempo Dips", desc: "Slow tempo dips — 4s down, 2s pause at bottom, explosive up", mobility: "Time under tension for maximum tricep growth", sets: "3×8", icon: "🕐" },
        { name: "Tiger Bend Push-Up", desc: "From forearms, press up to hands. Forearm to full push-up position", mobility: "Extreme tricep strength + elbow flexibility", sets: "3×5", icon: "🐅" },
        { name: "One-Arm Band Pushdown", desc: "Heavy band, one arm pushdowns. Full lockout squeeze", mobility: "Unilateral tricep peak contraction", sets: "3×10 each", icon: "1️⃣" },
      ],
      abs: [
        { name: "Dragon Flag Negatives", desc: "Lying on bench, legs vertical, lower rigid body with control", mobility: "Elite anterior chain control + total body tension", sets: "3×5", icon: "🐉" },
        { name: "Full Dragon Flags", desc: "Complete up & down. Body straight as a board", mobility: "Full bodyweight core mastery", sets: "3×5", icon: "🐲" },
        { name: "Hanging Leg Raises", desc: "From a bar, lift straight legs to horizontal or toes-to-bar", mobility: "Grip + compression + spinal decompression", sets: "3×8", icon: "🦇" },
      ],
      obliques: [
        { name: "Human Flag Progressions", desc: "Vertical pole — tuck legs and hold body sideways. Build hold time", mobility: "Total lateral strength — abs, obliques, shoulders", sets: "3×5–10s", icon: "🚩" },
        { name: "Windshield Wipers", desc: "Hanging from bar, legs up, rotate side to side keeping legs straight", mobility: "Rotational core strength at extreme range", sets: "3×6 each", icon: "🌊" },
        { name: "Side Plank + Reach Through", desc: "Full side plank, reach under body and rotate, return. Dynamic", mobility: "Thoracic rotation + lateral endurance", sets: "3×8 each", icon: "🔄" },
      ],
      glutes: [
        { name: "Full Pistol Squat", desc: "No support, full depth single-leg squat. Non-working leg straight out", mobility: "Peak single-leg strength, mobility & balance", sets: "3×5 each", icon: "🎯" },
        { name: "Single-Leg Hip Thrust", desc: "Shoulders elevated, one leg, full range. Pause 2s at top", mobility: "Maximum unilateral glute strength", sets: "3×8 each", icon: "💎" },
        { name: "Shrimp Squat Progression", desc: "Stand on one leg, grab rear foot, squat down until rear knee touches ground", mobility: "Extreme quad + glute + balance challenge", sets: "3×5 each", icon: "🦐" },
      ],
      quads: [
        { name: "Full Pistol Squat", desc: "Full depth on one leg, other leg extended forward. No assistance", mobility: "Peak lower body mobility + strength test", sets: "3×5 each", icon: "🎯" },
        { name: "Sissy Squat (full)", desc: "No support, lean back bending knees, heels up. Descend deep and rise", mobility: "Maximum quad isolation + knee resilience", sets: "3×8", icon: "🎭" },
        { name: "Jump Squats", desc: "Full squat, explode up. Land softly, immediately descend again", mobility: "Plyometric quad/glute power + landing mechanics", sets: "3×8", icon: "🚀" },
      ],
      hamstrings: [
        { name: "Full Nordic Curl", desc: "Controlled descent AND ascent. No push-up from bottom", mobility: "Elite hamstring strength — protects against injury", sets: "3×5", icon: "👑" },
        { name: "Weighted Single-Leg RDL", desc: "Hold heavy band for resistance, deep hinge on one leg", mobility: "Loaded flexibility + posterior chain power", sets: "3×8 each", icon: "🏆" },
        { name: "Pike Compression", desc: "Seated on floor, hands beside hips, lift legs straight. Work toward pancake", mobility: "Hamstring flexibility + compression = L-sit transfer", sets: "3×15s", icon: "🔺" },
      ],
      calves: [
        { name: "Pistol Calf Raise", desc: "Single-leg squat position, do calf raise at bottom. Extreme ankle demand", mobility: "Calf strength at deep ankle flexion angles", sets: "3×8 each", icon: "🔥" },
        { name: "Box Jump Calf Focus", desc: "Jump onto box landing on balls of feet. Step down. Focus on calf drive", mobility: "Reactive power + plyometric calf development", sets: "3×8", icon: "📦" },
        { name: "Weighted Eccentric Calf", desc: "Band around shoulders, stand on step. Rise on two, lower on one (5s)", mobility: "Peak eccentric overload for calf/achilles", sets: "3×6 each", icon: "🏗️" },
      ],
    },
  },
];

const MUSCLE_GROUPS = [
  { key: "chest", label: "Chest", icon: "◼", region: "push" },
  { key: "shoulders", label: "Shoulders", icon: "▲", region: "push" },
  { key: "triceps", label: "Triceps", icon: "◁", region: "push" },
  { key: "back", label: "Back", icon: "◈", region: "pull" },
  { key: "biceps", label: "Biceps", icon: "▷", region: "pull" },
  { key: "abs", label: "Abs", icon: "◆", region: "core" },
  { key: "obliques", label: "Obliques", icon: "◇", region: "core" },
  { key: "glutes", label: "Glutes", icon: "●", region: "legs" },
  { key: "quads", label: "Quads", icon: "■", region: "legs" },
  { key: "hamstrings", label: "Hams", icon: "▼", region: "legs" },
  { key: "calves", label: "Calves", icon: "▽", region: "legs" },
];

const REGION_COLORS = { push: "#C75050", pull: "#5080C7", core: "#C7A050", legs: "#50C770" };

export default function ProgressionProgram() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeMuscle, setActiveMuscle] = useState("chest");
  const [completedExercises, setCompletedExercises] = useState({});
  const [showSplit, setShowSplit] = useState(false);

  const phase = PHASES[activePhase];
  const exercises = phase.muscles[activeMuscle];

  const toggleComplete = (phaseIdx, muscle, exIdx) => {
    const key = `${phaseIdx}-${muscle}-${exIdx}`;
    setCompletedExercises((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getPhaseProgress = (phaseIdx) => {
    let total = 0, done = 0;
    MUSCLE_GROUPS.forEach(({ key }) => {
      PHASES[phaseIdx].muscles[key].forEach((_, i) => {
        total++;
        if (completedExercises[`${phaseIdx}-${key}-${i}`]) done++;
      });
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const getMuscleComplete = (phaseIdx, muscleKey) => {
    return PHASES[phaseIdx].muscles[muscleKey].every(
      (_, i) => completedExercises[`${phaseIdx}-${muscleKey}-${i}`]
    );
  };

  const regions = ["push", "pull", "core", "legs"];
  const regionLabels = { push: "Push", pull: "Pull", core: "Core", legs: "Legs" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      color: "#E8E4DF",
      fontFamily: "'Courier New', Courier, monospace",
      padding: "16px",
      maxWidth: 600,
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 22, paddingTop: 8 }}>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "#555", textTransform: "uppercase", marginBottom: 5 }}>
          Full Body Progression
        </div>
        <h1 style={{
          fontSize: 21,
          fontWeight: 900,
          margin: 0,
          letterSpacing: -0.5,
          lineHeight: 1.1,
          background: `linear-gradient(135deg, ${phase.accent}, ${phase.color})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          BODYWEIGHT & BANDS
        </h1>
        <div style={{ fontSize: 9, color: "#555", marginTop: 4 }}>
          11 muscles · 4 phases · Flexibility focused
        </div>
      </div>

      {/* Phase Selector */}
      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
        {PHASES.map((p, i) => {
          const progress = getPhaseProgress(i);
          const isActive = i === activePhase;
          return (
            <button key={i} onClick={() => setActivePhase(i)} style={{
              flex: 1, background: isActive ? p.color : "#1A1A1A",
              border: `1px solid ${isActive ? p.accent : "#2A2A2A"}`,
              borderRadius: 7, padding: "7px 2px 5px", cursor: "pointer",
              position: "relative", overflow: "hidden", transition: "all 0.2s",
            }}>
              {progress > 0 && <div style={{
                position: "absolute", bottom: 0, left: 0, width: `${progress}%`,
                height: 2, background: p.accent, transition: "width 0.3s",
              }} />}
              <div style={{ fontSize: 8, color: isActive ? "#fff" : "#555", letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit" }}>
                {p.name}
              </div>
              <div style={{ fontSize: 7, color: isActive ? "rgba(255,255,255,0.5)" : "#444", marginTop: 1, fontFamily: "inherit" }}>
                {p.weeks.replace("Weeks ", "Wk ")}
              </div>
            </button>
          );
        })}
      </div>

      {/* Phase Info */}
      <div style={{
        background: "#141414", border: `1px solid ${phase.color}44`,
        borderRadius: 9, padding: "10px 12px", marginBottom: 12,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: phase.accent }}>{phase.name}</span>
          <span style={{ fontSize: 9, color: "#666" }}>{phase.weeks}</span>
        </div>
        <div style={{ fontSize: 10, color: "#999", marginBottom: 6 }}>{phase.subtitle}</div>
        {[
          ["Schedule", phase.schedule],
          ["Volume", phase.sets],
          ["Progress", phase.rule],
        ].map(([label, val]) => (
          <div key={label} style={{ fontSize: 9, color: "#777", lineHeight: 1.4, marginBottom: 2 }}>
            <span style={{ color: phase.accent, fontWeight: 700 }}>{label}:</span> {val}
          </div>
        ))}
      </div>

      {/* Muscle Selector */}
      <div style={{ marginBottom: 14 }}>
        {regions.map((region) => {
          const musclesInRegion = MUSCLE_GROUPS.filter((m) => m.region === region);
          return (
            <div key={region} style={{ marginBottom: 5 }}>
              <div style={{
                fontSize: 7, letterSpacing: 2, color: REGION_COLORS[region],
                textTransform: "uppercase", marginBottom: 3, fontWeight: 700,
              }}>
                {regionLabels[region]}
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {musclesInRegion.map(({ key, label, icon }) => {
                  const isActive = key === activeMuscle;
                  const isDone = getMuscleComplete(activePhase, key);
                  return (
                    <button key={key} onClick={() => setActiveMuscle(key)} style={{
                      flex: 1, padding: "6px 2px 4px",
                      background: isActive ? "#1E1E1E" : "transparent",
                      border: `1px solid ${isActive ? phase.accent : "#222"}`,
                      borderRadius: 5, cursor: "pointer", transition: "all 0.15s",
                      position: "relative",
                    }}>
                      <div style={{ fontSize: 9, marginBottom: 0 }}>{icon}</div>
                      <div style={{
                        fontSize: 7, fontWeight: 700,
                        color: isActive ? phase.accent : "#555",
                        letterSpacing: 0.3, textTransform: "uppercase", fontFamily: "inherit",
                      }}>
                        {label}
                      </div>
                      {isDone && <div style={{
                        position: "absolute", top: 1, right: 2, fontSize: 6, color: "#4A7C59",
                      }}>✓</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Muscle Title */}
      <div style={{
        fontSize: 12, fontWeight: 700, color: phase.accent,
        marginBottom: 8, letterSpacing: 1, textTransform: "uppercase",
      }}>
        {MUSCLE_GROUPS.find((m) => m.key === activeMuscle)?.icon}{" "}
        {MUSCLE_GROUPS.find((m) => m.key === activeMuscle)?.label}
      </div>

      {/* Exercises */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {exercises.map((ex, i) => {
          const key = `${activePhase}-${activeMuscle}-${i}`;
          const isDone = completedExercises[key];
          return (
            <div key={key} style={{
              background: isDone ? "#0F1A13" : "#141414",
              border: `1px solid ${isDone ? "#2D5A3A" : "#222"}`,
              borderRadius: 9, padding: "11px 13px",
              transition: "all 0.2s", opacity: isDone ? 0.7 : 1,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
                  <span style={{ fontSize: 18 }}>{ex.icon}</span>
                  <div>
                    <div style={{
                      fontSize: 12, fontWeight: 700,
                      color: isDone ? "#6BAF7E" : "#E8E4DF",
                      textDecoration: isDone ? "line-through" : "none",
                    }}>{ex.name}</div>
                    <div style={{ fontSize: 10, color: phase.accent, fontWeight: 600, marginTop: 1 }}>
                      {ex.sets}
                    </div>
                  </div>
                </div>
                <button onClick={() => toggleComplete(activePhase, activeMuscle, i)} style={{
                  width: 24, height: 24, borderRadius: 5,
                  border: `2px solid ${isDone ? "#4A7C59" : "#333"}`,
                  background: isDone ? "#4A7C59" : "transparent",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, color: "#fff",
                  flexShrink: 0, transition: "all 0.2s",
                }}>
                  {isDone ? "✓" : ""}
                </button>
              </div>
              <div style={{ fontSize: 10, color: "#999", lineHeight: 1.5, marginBottom: 5, paddingLeft: 27 }}>
                {ex.desc}
              </div>
              <div style={{
                fontSize: 9, color: phase.accent, background: `${phase.color}15`,
                borderRadius: 5, padding: "4px 7px", marginLeft: 27, lineHeight: 1.4,
              }}>
                <span style={{ fontWeight: 700 }}>↗ Mobility:</span> {ex.mobility}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Splits */}
      <div style={{
        background: "#141414", border: "1px solid #222",
        borderRadius: 9, padding: "10px 12px", marginTop: 16,
      }}>
        <button onClick={() => setShowSplit(!showSplit)} style={{
          background: "none", border: "none", cursor: "pointer", width: "100%",
          display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: phase.accent, letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit" }}>
            Suggested Splits
          </span>
          <span style={{ fontSize: 13, color: "#555", fontFamily: "inherit" }}>{showSplit ? "−" : "+"}</span>
        </button>
        {showSplit && (
          <div style={{ marginTop: 8 }}>
            {[
              { name: "Full Body (3×/wk)", desc: "All muscles each session. Pick 1 exercise per muscle. Best for Foundation." },
              { name: "Upper / Lower (4×/wk)", desc: "Upper: Chest, Shoulders, Back, Biceps, Triceps · Lower: Glutes, Quads, Hams, Calves · Core both days" },
              { name: "Push / Pull / Legs (5×/wk)", desc: "Push: Chest, Shoulders, Triceps · Pull: Back, Biceps · Legs: Glutes, Quads, Hams, Calves · Core on push+pull" },
            ].map((split, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#CCC" }}>{split.name}</div>
                <div style={{ fontSize: 8, color: "#777", lineHeight: 1.4, marginTop: 2 }}>{split.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Session Template */}
      <div style={{
        background: "#141414", border: "1px solid #222",
        borderRadius: 9, padding: "10px 12px", marginTop: 6,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: phase.accent, marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>
          Session Template
        </div>
        {[
          { time: "5 min", label: "Warm-up", detail: "Dynamic stretches: leg swings, arm circles, hip circles, cat-cow, inch-worms" },
          { time: "25–40m", label: "Main Work", detail: "3 exercises per muscle for your split. Rest 60–90s between sets" },
          { time: "5 min", label: "Cool-down", detail: "Static stretches 30s each: pigeon, forward fold, chest doorway stretch, cobra" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 9, marginBottom: i < 2 ? 7 : 0, alignItems: "flex-start" }}>
            <div style={{
              fontSize: 8, color: "#666", background: "#1A1A1A",
              borderRadius: 3, padding: "2px 5px", whiteSpace: "nowrap", fontWeight: 600,
            }}>{item.time}</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#CCC" }}>{item.label}</div>
              <div style={{ fontSize: 8, color: "#777", lineHeight: 1.4, marginTop: 1 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Principles */}
      <div style={{
        background: "#141414", border: "1px solid #222",
        borderRadius: 9, padding: "10px 12px", marginTop: 6, marginBottom: 16,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#777", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>
          Key Principles
        </div>
        {[
          "Control the negative — 3 second lowering on every rep",
          "Never sacrifice form for reps. Cut the set short if form breaks",
          "Muscles progress at different rates — advance each independently",
          "Include static stretching after every session for flexibility gains",
          "Prioritize abs, glutes & hamstrings — your identified weak points",
          "Rest at least 48hrs before training the same muscle group again",
        ].map((tip, i) => (
          <div key={i} style={{ fontSize: 9, color: "#888", lineHeight: 1.5, marginBottom: 4, paddingLeft: 11, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: phase.accent }}>→</span>
            {tip}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 7, color: "#2A2A2A", padding: "0 0 16px", letterSpacing: 2 }}>
        TAP CHECKBOXES TO TRACK MASTERY
      </div>
    </div>
  );
}
