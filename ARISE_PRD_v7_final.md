# ARISE — Product Requirements Document
**Version:** 7.0 (Final)
**Classification:** Internal — Personal System
**Target User:** College student, hostel environment, 3–5 month transformation arc
**Inspiration:** Solo Leveling System — daily quests, penalty events, stat growth, forced accountability

---

## 1. PRODUCT OVERVIEW

### 1.1 Vision
ARISE is a mobile-first habit enforcement system disguised as a game. It does not motivate through rewards alone — it enforces through consequences. Every day the system assigns tasks. If tasks are completed, stats grow and the system adapts to push harder. If tasks are failed, a Penalty Event triggers immediately, forcing completion before normal life can resume. The system resets cleanly after every penalty. No debt. No stacking. No passive punishment.

### 1.2 Core Philosophy
- **Strict, not optional.** The system does not ask. It assigns and enforces.
- **Adaptive, not random.** Task selection is driven by stats, fatigue, and past performance.
- **Consequence-based.** Failure triggers a forced response — not a logged note.
- **Clean reset.** Once a penalty is completed, the slate is wiped. No lingering punishment.
- **Realistic constraints respected.** The system understands hostel life, mess food, inconsistent schedules, and variable energy.

### 1.3 Target Transformation (3–5 Months)
| Domain | Goal |
|--------|------|
| Physical | Gain muscle mass from underweight baseline |
| Technical | Become internship/job-ready (coding + DSA) |
| Confidence | Build real-world social and functional ability |

---

## 2. STAT SYSTEM

### 2.1 Core Stats
Six stats are tracked. All are earned through action — never assigned manually.

| Stat | Code | Represents |
|------|------|-----------|
| Strength | STR | Physical output, gym performance, physical tasks |
| Agility | AGI | Speed, flexibility, physical adaptability |
| Stamina | STA | Endurance, consistency over time, recovery |
| Intelligence | INT | Coding ability, DSA progress, problem-solving |
| Awareness | AWR | Self-reflection, journaling, environmental adaptability |
| Discipline | DIS | Task completion rate, streak quality, system adherence |

### 2.2 Stat Gain Rules
- Stats increase **only** through completing assigned tasks.
- Each task has a primary stat target and a secondary stat bonus.
- Stat gains are fixed per task type — not randomised.
- No manual allocation is ever permitted.
- Stat values are integers displayed as a level bar (0–100 per level, then levels up).

### 2.3 Stat Decay Rules
- **If ≥ 1 task is completed in a day:** No decay occurs on any stat.
- **If 0 tasks are completed in a day:** A small flat decay of **−2 points** is applied to the stat most relevant to the missed task category.
- Decay is applied once per day — not per task missed.
- No multi-day compounding. No decay below 0.

### 2.4 Stat Display
- Hexagonal radar chart on main dashboard, color-coded: low (red) → mid (amber) → high (green).
- Weakest stat highlighted with a pulse indicator.
- Per-stat history graph (7-day and 30-day views).

---

## 3. DAILY TASK SYSTEM

### 3.1 Daily Task Composition
Every day, exactly **3 tasks** are assigned:

| Slot | Type | Description |
|------|------|-------------|
| Task 1 | **Mandatory Coding Task** | Always present. DSA or project-based. Cannot be swapped or skipped. |
| Task 2 | **Adaptive Task — Primary** | Chosen based on weakest stat, past performance, fatigue. |
| Task 3 | **Adaptive Task — Secondary** | Complements Task 2 without overloading. |

### 3.2 Task Assignment Logic
Adaptive tasks are selected in this priority order:

1. **Weakest Stat:** Assign a task targeting the lowest-value stat.
2. **Past Performance:** If the user has failed a specific task type 2+ times in the last 7 days, do not reassign it until 1 successful completion is observed in an intervening day.
3. **Fatigue Score:** Derived from completion rate over the last 3 days.
   - Fatigue high (< 50% completion): assign Tier 1 (Recovery) tasks.
   - Fatigue low (≥ 80% completion): assign Tier 3 (Challenge) tasks.
4. **No pure randomness.** Every assignment has a traceable, system-logged reason.

### 3.3 Task Difficulty Tiers
| Tier | Label | Time Required | When Assigned |
|------|-------|---------------|---------------|
| 1 | Recovery | 10–20 min | High fatigue, post-penalty day |
| 2 | Standard | 25–45 min | Normal state |
| 3 | Challenge | 50–90 min | Low fatigue, streak active |

### 3.4 Task Categories and Stat Mapping
| Task Category | Primary Stat | Secondary Stat |
|---------------|-------------|---------------|
| DSA / Coding Problem | INT | DIS |
| Project work / building | INT | AWR |
| Gym / resistance training | STR | STA |
| Bodyweight / home workout | STR | AGI |
| Cardio / walk | STA | AGI |
| Journaling / reflection | AWR | DIS |
| Reading / research | INT | AWR |
| Social task (talk to someone new) | AWR | DIS |
| Nutrition compliance | STA | DIS |

### 3.5 Mandatory Coding Task — Details
- Assigned every day without exception.
- Difficulty scales with INT stat level and recent completion history.
- Topics rotate: Arrays, Strings, Linked Lists, Trees, Graphs, DP, Sorting, System Design basics.
- Marked complete only when user submits a solution link or confirms manually with a reflection note. A follow-up micro-question fires on manual confirm (e.g., "What was the time complexity?") to prevent tap-through gaming.

### 3.6 Task Window
- Tasks assigned at user-configured morning time (default: 7:00 AM).
- Each task has a suggested time window — not hard-enforced except at Day End Deadline.
- Day resets at midnight.
- **Day End Deadline** (user-configured, default: 11:00 PM): any incomplete task at this point triggers a Penalty Event.

---

## 4. PENALTY EVENT SYSTEM

### 4.1 Principle
Failure is not passive. When a task is missed, the system triggers a Penalty Event immediately (or at the Day End Deadline). The Penalty Event must be completed before normal app access resumes.

### 4.2 What Is Removed (v7 Hard Exclusions)
- ❌ Penalty stacking
- ❌ Penalty debt carry-over to next day
- ❌ Shadow bans or streak erasure as punishment
- ❌ Passive stat-reduction-only penalties
- ❌ Skippable penalty screens

### 4.3 Penalty Event Trigger Conditions
| Condition | Trigger |
|-----------|---------|
| User marks a task as failed | Immediate Penalty Event |
| Day End Deadline passes with ≥ 1 task incomplete | Immediate Penalty Event |
| User ignores an active Penalty Event > 30 min | Escalation (see 4.6) |

Only **one** Penalty Event runs at a time. Multiple missed tasks → one penalty of appropriate tier.

### 4.4 Penalty Event Structure
1. Full-screen takeover launches immediately.
2. Sound alert fires (non-silenceable unless device is silent, in which case max vibration pattern).
3. Penalty task displayed with countdown timer showing time before escalation.
4. No other app screen is accessible.
5. User taps **"ACCEPT PENALTY"** to begin.
6. User completes penalty task.
7. User confirms completion (micro-verification to prevent false completion).
8. **Full reset.** System displays: "PENALTY COMPLETE. SYSTEM RESET." for 3 seconds, then returns to dashboard.

### 4.5 Penalty Task Tiers
| Tier | Trigger Condition | Example Tasks |
|------|-------------------|---------------|
| Tier 1 — Standard | First miss in last 7 days | 50 push-ups, 10-min walk, 200-word journal entry |
| Tier 2 — Hard | Second miss in last 7 days OR Tier 1 ignored | 100 push-ups + 20 squats, 20-min run, 1 easy LeetCode |
| Tier 3 — Severe | Third+ miss in 7 days OR Tier 2 ignored | 150 push-ups + 30 squats + 10 burpees, 1 medium LeetCode, full reflection note |

Penalty tier resets to Tier 1 after 7 consecutive clean days.

### 4.6 Ignored Penalty Escalation Protocol
| Time Elapsed | System Action |
|-------------|---------------|
| 0–15 min | Full-screen active, countdown visible |
| 15 min | Warning notification: "Penalty escalating in 15 minutes" |
| 30 min | Re-alert: full sound + vibration, second warning screen |
| 45 min | Escalation: penalty upgrades to next tier, new full-screen fires |
| Escalation ignored 45+ more min | Escalate to Tier 3 (maximum). Re-alert every 30 min until completed. |

Tier 3 is the ceiling. No further escalation — only repeated re-alerts every 30 min until completed.

### 4.7 Penalty Completion and Reset
Upon confirmed completion:
- Penalty screen closes, full app access restored.
- Failure recorded only in fatigue score (affects next-day task difficulty selection).
- No stat decay applied in addition to penalty.
- No tomorrow's tasks modified punitively.
- No failure messaging appears the next day.
- System acknowledges with: **"PENALTY COMPLETE. SYSTEM RESET."**

---

## 5. NUTRITION SYSTEM

### 5.1 Principle
Macro and calorie tracking is incompatible with hostel mess environments. ARISE v7 uses a simple daily checklist. Goal: consistent quality inputs, not precise numbers.

### 5.2 Daily Nutrition Checklist
These are not tasks — they do not trigger penalties. They contribute to STA and DIS via weekly compliance score.

| # | Item | Notes |
|---|------|-------|
| 1 | Protein source — Meal 1 | Eggs (2+), dal, paneer, curd, or mess protein |
| 2 | Protein source — Meal 2 | At least one more protein input during the day |
| 3 | Meals eaten (≥ 3) | At least three meals consumed |
| 4 | Extra calorie input | Peanut butter, banana, extra roti, milk, any deliberate addition |
| 5 | Water (≥ 2L) | Approximate — mark if reasonably met |

### 5.3 Weekly Compliance Score
- Score = items checked across 7 days ÷ total possible items × 100
- ≥ 70% compliance: +1 STA, +1 DIS at week end
- < 70%: no gain, no penalty
- Score is visible — never weaponised

### 5.4 Egg Protocol (Recommended Default)
- Target: 4–6 eggs per day when mess food is poor or uncertain
- Meeting this quantity counts as both Protein checks for the day
- One-tap "Egg Protocol" toggle on the nutrition screen for fast logging

### 5.5 Explicitly Excluded From Nutrition Tracking
- Calorie counts
- Macro breakdowns (protein g, carb g, fat g)
- Meal timing logs
- Supplement schedules

---

## 6. ADAPTATION AND PROGRESSION

### 6.1 Weekly Automated Review
Every Sunday evening, the system generates:
- Stats summary (gains, losses, net change per stat)
- Task completion rate for the week
- Penalty count and tier breakdown
- Nutrition compliance %
- One factual system observation (no generic motivation — descriptive only)

### 6.2 Adaptive Difficulty Recalibration (Every 7 Days)
| Signal | Adjustment |
|--------|-----------|
| Completion rate > 85% for 7 days | Task difficulty increases one tier |
| Completion rate < 50% for 7 days | Task difficulty decreases one tier |
| Same stat weakest for 14+ days | Task frequency for that stat increases |
| Penalty triggered 3+ times in a week | System inserts 1 Recovery-tier day mid-next-week |
| Tasks completed significantly ahead of schedule | Optional bonus task offered (not mandatory, no penalty if skipped) |

### 6.3 Milestones
Tracked silently. No currency or item rewards — milestones mark real-world progress only.

| Milestone | Condition |
|-----------|-----------|
| First Week Survived | 7 days with ≥ 1 task completed per day |
| No Penalty Week | 7 days with zero penalty events |
| INT Breakout | INT reaches 40 |
| STR Foundation | STR reaches 40 |
| Full Compliance Day | All 3 tasks + all 5 nutrition checks in one day |
| 30-Day Streak | 30 consecutive days with ≥ 1 task completed |
| System Veteran | 60 days active |

---

## 7. UI AND INTERFACE

### 7.1 Main Dashboard
- Hexagonal radar chart showing all 6 stats; weakest stat pulsed
- Today's 3 tasks with completion toggles
- Day End Deadline countdown (always visible)
- Nutrition checklist accessible via bottom tab
- Active penalty indicator if a penalty is currently running

### 7.2 Penalty Event UI (Full-Screen)
- Full-screen takeover — no navigation, no back button, no home within app
- Dark red background with pulsing border animation
- Header: **"PENALTY EVENT — SYSTEM ENFORCEMENT"**
- Penalty task displayed in large text
- Countdown timer: time before escalation
- Single button: **"ACCEPT PENALTY"**
- After acceptance: task instructions full-screen, completion confirm button
- On confirm: micro-verification prompt (prevents accidental tap)
- Completion screen: **"PENALTY COMPLETE. SYSTEM RESET."** shown for 3 seconds → returns to dashboard

### 7.3 Sound and Vibration
- Distinct alarm-class sound on penalty trigger (not a standard notification tone)
- Device on silent: maximum vibration — 3-pulse repeating pattern for 10 seconds
- Re-alert sounds fire at every escalation checkpoint (15 min, 30 min, 45 min)
- Sound silenceable only after penalty screen is opened and acknowledged

### 7.4 Persistent Reminders
- Overdue task: persistent non-dismissable notification, fires every 30 min
- < 60 min to Day End Deadline with tasks incomplete: frequency increases to every 10 min
- Reminders stop only when tasks are completed or a penalty event triggers

### 7.5 Focus Mode (Optional)
- Activated from dashboard by user
- Greyscale UI, all non-task elements hidden
- Only active task + elapsed stopwatch timer visible
- Exits on task completion or manual exit
- Penalty screen overrides Focus Mode unconditionally — cannot be blocked

### 7.6 Task Completion Flow
1. User taps task → task details shown (what to do, which stat, estimated time)
2. User taps **"Begin Task"** (optional — starts focus stopwatch)
3. User completes task in real world
4. User taps **"Mark Complete"**
5. Micro-verification question (contextual, free text, not graded — e.g. for coding: "What approach did you use?")
6. Task marked complete, stat updated, dashboard refreshes

### 7.7 Stat History Screen
- Per-stat view: 7-day sparkline, 30-day line graph
- Shows which task contributed to each gain
- Shows days with decay and logged reason

### 7.8 Explicitly Excluded UI Elements
- ❌ Loot boxes or reward animations
- ❌ In-app currency or coins
- ❌ Avatar / cosmetics
- ❌ Leaderboards
- ❌ Social sharing prompts
- ❌ Streak flames or celebration confetti

---

## 8. TECHNICAL REQUIREMENTS

### 8.1 Platform
- iOS and Android (React Native or Flutter)
- Offline-first: all core functionality (task display, completion, penalty trigger) works without internet
- Cloud sync when connected

### 8.2 Notifications
- Penalty alerts bypass Do Not Disturb where OS permits (alarm-class on Android; Critical Alerts on iOS with user permission)
- Persistent notifications cannot be dismissed from the notification tray

### 8.3 Storage
- Local: SQLite for all task data, stat history, and penalty records
- Cloud: end-to-end encrypted, user-authenticated, opt-in only

### 8.4 Performance
- Penalty screen must appear within 1 second of trigger
- No loading states on the main dashboard
- App cold-start < 2 seconds

### 8.5 Privacy
- No data sold or shared
- All personal performance data stays on-device unless cloud backup explicitly enabled by user
- No analytics transmitted without explicit consent

---

## 9. SYSTEM LOGIC SUMMARY

```
DAILY FLOW:
  Morning (configured time):
    → Assign Task 1 (Mandatory Coding)
    → Assign Task 2 (Adaptive — weakest stat, past performance, fatigue)
    → Assign Task 3 (Adaptive — complement Task 2, fatigue-adjusted)
    → Notify user

  Throughout Day:
    → Task overdue → persistent non-dismissable reminder every 30 min
    → < 60 min to deadline with tasks incomplete → reminder every 10 min

  Day End Deadline:
    → All complete → clean day, stats updated, no decay
    → ≥ 1 incomplete → Penalty Event triggers immediately

PENALTY FLOW:
  Trigger → Full-screen + sound/vibration
  → User accepts → completes penalty task → micro-confirms
  → Full reset. No carry-over.

  If ignored:
    15 min  → Warning notification
    30 min  → Re-alert (sound + vibration)
    45 min  → Escalate to next tier, new full-screen
    Tier 3 max → Re-alert every 30 min until complete

DECAY:
  ≥ 1 task completed today → No decay on any stat
  0 tasks completed today  → −2 flat to most relevant stat (once)

NUTRITION:
  5-item checklist (protein ×2, meals ≥3, extra calories, water)
  No macro tracking. No penalty for misses.
  Weekly ≥70% compliance → +1 STA, +1 DIS

STAT GAIN:
  Task completion only. No manual allocation. No randomness.
```

---

## 10. OUT OF SCOPE

| Feature | Reason |
|---------|--------|
| Macro / calorie tracking | Incompatible with hostel constraints |
| Manual stat allocation | Defeats earned-progress principle |
| Penalty stacking | Demotivating, psychologically harmful |
| Penalty debt to next day | Violates clean-reset principle |
| Shadow bans / streak wipes as punishment | Passive — no forced action |
| Social features / leaderboards | Out of scope for personal system |
| Random task generation | System must be explainable and traceable |
| Loot / rewards / cosmetics | Not aligned with system philosophy |

---

## 11. OPEN QUESTIONS (DEFERRED)

| Question | Status |
|----------|--------|
| LeetCode API integration for coding task auto-verification? | Deferred — v2 |
| User-submitted custom tasks? | Deferred — gaming risk to be assessed |
| Wearable integration (steps, heart rate) for STA/AGI? | Deferred — v2 |
| Penalty re-alerts via system alarm vs in-app sound? | Needs OS-level testing |

---

*ARISE PRD v7.0 — Final. Document end.*
