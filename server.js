const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/source', express.static(path.join(__dirname, 'source')));
app.use('/wiki', express.static(path.join(__dirname, 'wiki')));
app.use('/demo-day', express.static(path.join(__dirname, 'demo-day')));
app.use('/storyboard', express.static(path.join(__dirname, 'storyboard')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads'), {
  setHeaders(res){ res.setHeader('Content-Disposition', 'attachment'); }
}));
app.use(express.static(path.join(__dirname, 'public')));

// Specific asset library route
app.get('/library', (req, res) => {
  res.sendFile(path.join(__dirname, 'V1 GAIA Asset Library.html'));
});

// Video Streaming Route with Range support
app.get('/film/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'assets', 'film', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Film not found or still generating' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes'
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'assets', 'film', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  res.download(filePath, filename);
});

// API endpoint for film status & metadata
app.get('/api/film-status', (req, res) => {
  const fullPath = path.join(__dirname, 'assets', 'film', 'gaia-product-film.mp4');
  const cutdownPath = path.join(__dirname, 'assets', 'film', 'gaia-product-film-15s.mp4');

  const fullReady = fs.existsSync(fullPath);
  const cutdownReady = fs.existsSync(cutdownPath);

  res.json({
    full: {
      ready: fullReady,
      filename: 'gaia-product-film.mp4',
      url: '/film/gaia-product-film.mp4',
      downloadUrl: '/download/gaia-product-film.mp4',
      sizeBytes: fullReady ? fs.statSync(fullPath).size : 0,
      durationSeconds: 215,
      runtimeLabel: '~3:35'
    },
    cutdown: {
      ready: cutdownReady,
      filename: 'gaia-product-film-15s.mp4',
      url: '/film/gaia-product-film-15s.mp4',
      downloadUrl: '/download/gaia-product-film-15s.mp4',
      sizeBytes: cutdownReady ? fs.statSync(cutdownPath).size : 0,
      durationSeconds: 15,
      runtimeLabel: '0:15'
    },
    brand: {
      title: "GAIA — Your Property Practice, Running Itself",
      client: "Gom Chambers",
      creator: "Keplar Flow Limited",
      palette: {
        forest: "#0F3D2E",
        forest2: "#145038",
        gold: "#D4A24C",
        paper: "#FBFAF7",
        navy: "#0F2A43"
      }
    }
  });
});

// 9 Scenes from source/docs/VIDEO-SCRIPT.md
app.get('/api/scenes', (req, res) => {
  const scenes = [
    {
      id: 1,
      no: "01",
      name: "THE PAIN",
      timecode: "0:00–0:25",
      startSec: 0,
      duration: 25,
      card: "/assets/cards/gaia-card-01.svg",
      kicker: "Oversight is the enemy.",
      vo: "Rent tracked in notebooks. Renewals remembered by memory. Receipts in three different inboxes. If one date slips, it costs the practice real money — and nobody meant for it to happen.",
      visualNote: "Slow pans of paper ledger, WhatsApp voice notes piling, a missed renewal calendar.",
      interactiveType: "pain-comparison"
    },
    {
      id: 2,
      no: "02",
      name: "ENTER GAIA",
      timecode: "0:25–0:50",
      startSec: 25,
      duration: 25,
      card: "/assets/cards/gaia-card-02.svg",
      kicker: "One workspace, one truth.",
      vo: "This is GAIA — your entire property practice in one workspace. Expected rent. Money actually received. What's unpaid. Which estate carries the risk. Live, always current, one screen.",
      visualNote: "GAIA Portal fades in. Hold on the four KPI cards, then the arrears chart.",
      interactiveType: "kpi-portal"
    },
    {
      id: 3,
      no: "03",
      name: "THE CASCADE",
      timecode: "0:50–1:20",
      startSec: 50,
      duration: 30,
      card: "/assets/cards/gaia-card-03.svg",
      kicker: "745,000 → 545,000. Everywhere. Instantly.",
      vo: "One confirmation — and every dashboard, chart, and ledger tells the truth at the same moment. The tenant's balance updates. The estate's arrears drop. The portfolio recalculates. No spreadsheets. No 'whose number is right?' Just one truth.",
      visualNote: "PA view → Pending Verification (P-014, ₦200,000). Check bank app split-screen. Click Status → Verified. Cut: arrears queue drops 745k→545k; estate chart bar shrinks; donut nudges.",
      interactiveType: "cascade-simulator",
      heroMoment: true
    },
    {
      id: 4,
      no: "04",
      name: "NEVER MISS A DATE",
      timecode: "1:20–1:50",
      startSec: 80,
      duration: 30,
      card: "/assets/cards/gaia-card-04.svg",
      kicker: "≤30 · ≤60 · ≤90 — automatic.",
      vo: "Every lease end. Every rent date. Every deadline — on a calendar, with the whole portfolio as a timeline. GAIA flags renewals ninety, sixty, thirty days out, automatically. The system remembers so nobody has to.",
      visualNote: "Calendar view filling with lease ends + rent dates; then the timeline swimlanes by estate.",
      interactiveType: "date-radar"
    },
    {
      id: 5,
      no: "05",
      name: "FIELD TO OFFICE IN TEN SECONDS",
      timecode: "1:50–2:20",
      startSec: 110,
      duration: 30,
      card: "/assets/cards/gaia-card-05.svg",
      kicker: "Field → Triage. 10 seconds.",
      vo: "A burst pipe at Unit A-04. The field agent opens his phone, logs it, snaps a photo. Ten seconds later it's in the PA's triage queue — classified, owned, dated. No WhatsApp. No paper. No 'I thought you saw it.'",
      visualNote: "Phone in hand at a property. Field Portal → incident form → photo → submit. Cut to PA's triage queue: the task appears.",
      interactiveType: "field-triage",
      heroMoment: true
    },
    {
      id: 6,
      no: "06",
      name: "THE MONEY IS PROTECTED",
      timecode: "2:20–2:40",
      startSec: 140,
      duration: 20,
      card: "/assets/cards/gaia-card-06.svg",
      kicker: "Evidence, audit trail, boundaries.",
      vo: "And the money? Field agents never see it — not hidden, simply never shared. Records are verified before they count. Access is granted per role, by the Principal alone. GAIA is built for a legal practice: evidence, audit trail, and boundaries.",
      visualNote: "Backend page (locked icon), then Field portal showing ONLY assignments. Attempt to open payments → no access.",
      interactiveType: "security-rbac"
    },
    {
      id: 7,
      no: "07",
      name: "GOOGLE, FLEXED",
      timecode: "2:40–3:05",
      startSec: 160,
      duration: 25,
      card: "/assets/cards/gaia-card-07.svg",
      kicker: "Calendar ✓ Drive ✓ Gmail (soon) ✓",
      vo: "It lives where your firm already lives. Deadlines drop onto Google Calendar with real reminders. Leases, receipts, and photos file into Google Drive — one folder per tenancy, linked to its record. Your filing cabinet, self-building.",
      visualNote: "Google Calendar receiving GAIA deadlines with a reminder popping on a phone; Drive folder GAIA/Estates/…/TEN-003 with lease + receipts.",
      interactiveType: "google-workspace",
      heroMoment: true
    },
    {
      id: 8,
      no: "08",
      name: "ASK GAIA ANYTHING",
      timecode: "3:05–3:20",
      startSec: 185,
      duration: 15,
      card: "/assets/cards/gaia-card-08.svg",
      kicker: "Ask. It answers.",
      vo: "And you can just ask. In plain English. The workspace answers — and behind it, Keplar's delivery agent keeps the knowledge current.",
      visualNote: "Notion AI answering 'Which estates have arrears and what expires this month?' in plain English.",
      interactiveType: "ai-assistant"
    },
    {
      id: 9,
      no: "09",
      name: "CLOSE",
      timecode: "3:20–3:35",
      startSec: 200,
      duration: 15,
      card: "/assets/cards/gaia-card-09.svg",
      kicker: "This is your practice, running itself.",
      vo: "GAIA. Built for Gom Chambers. Every lease, every naira, every deadline — accounted for. This is your practice, running itself.",
      visualNote: "Portal one more time, slow zoom on the four cards. Logo.",
      interactiveType: "close-summary"
    }
  ];
  res.json(scenes);
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GAIA Product Film Studio server running on port ${PORT}`);
});
