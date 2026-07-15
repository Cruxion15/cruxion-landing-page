# Ready-to-paste copy for entity profiles

Fill in [brackets], then paste as-is. None of this names a competitor.

## Crunchbase

**Company name:** Cruxion

**Short description (one line, ~250 chars):**
Cruxion is an AI-native engineering education platform for Indian engineering colleges, giving CS and EC students AI-graded coding assignments with Understanding Verification.

**Long description:**
Cruxion is an AI-native engineering education platform built for Indian engineering colleges. Students build with AI assistance across two tracks, CS/ISE/AIML (system design, cloud engineering on AWS, GCP, and Azure) and EC/ECE/EEE (embedded systems, IoT on Arduino), progressing through a three-tier structure: Apprentice, Engineer, Architect. Cruxion's core feature, Understanding Verification, uses a Socratic AI mentor to confirm a student actually understood their own submission, not just that it ran. Cruxion Pulse extends the platform into a daily-engagement layer with streaks, spaced-repetition review, and a live leaderboard. Cruxion is based in Bengaluru, India.

**Industries / categories:** EdTech, Artificial Intelligence, Education, E-Learning
**Location:** Bengaluru, Karnataka, India
**Founded:** [month/year]
**Website:** https://cruxion.in
**Founder:** [your name]

## LinkedIn Company Page

**Tagline (120 chars max):**
AI-native engineering education for Indian colleges. Understanding Verification, not just working code.

**About section:**
Cruxion gives engineering colleges in India an AI-native way to teach coding and hardware skills. Students build with AI assistance across CS/ISE/AIML and EC/ECE/EEE tracks, and every assignment runs through Understanding Verification, a Socratic AI mentor that confirms real comprehension, not just a passing test. Cruxion Pulse adds a daily-engagement layer of streaks, spaced repetition, and a live leaderboard, so practice doesn't drop off between classes.

Based in Bengaluru, India.

**Industry:** E-Learning
**Company size:** [pick a range]
**Website:** https://cruxion.in

## Wikidata item

Create at wikidata.org (lower notability bar than Wikipedia; this is a structured data entry, not an article).

**Label:** Cruxion
**Description (short):** AI-native engineering education platform for Indian colleges
**Statements to add:**
- instance of (P31): edtech company / software company
- country (P17): India
- headquarters location (P159): Bengaluru
- official website (P856): https://cruxion.in
- founder (P112): [your name, create a Wikidata item for yourself if you don't have one]
- inception (P571): [founding date]

Link back from the site: this is what the `sameAs` array in the site's schema will eventually point to, so keep the label and description here word-for-word identical to what's on cruxion.in and LinkedIn.

## Google Business Profile

**Business name:** Cruxion
**Category:** Educational Consultant (or "Software Company" if that fits better once you pick one)
**Description (750 char max):**
Cruxion is an AI-native engineering education platform for Indian engineering colleges. We help CS and EC students build real skills with AI assistance, verified through our Understanding Verification model, so colleges can be confident students actually understood what they built, not just that it worked. Cruxion Pulse keeps students engaged daily with streaks, spaced repetition, and a live leaderboard.
**Location:** Bengaluru, Karnataka, India
**Website:** https://cruxion.in
**Service area:** Karnataka, India (expand as pilots grow)

---

Notes:
- Keep the one-line description **identical, word for word**, across all four plus the site's own meta description. That consistency is what builds "entity confidence" for AI systems trying to recognize Cruxion as a single, real thing.
- None of this mentions a competitor by name, per your instruction.
- Once these exist, tell me the URLs and I'll wire them into the `sameAs` array in `layout.tsx` (currently only has LinkedIn, app.cruxion.in, and the GitHub org).
