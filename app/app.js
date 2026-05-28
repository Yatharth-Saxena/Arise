// --- ARISE SYSTEM LOGIC ---

// --- TAB NAVIGATION LOGIC ---
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        if (!targetId) return;

        // Remove active class from all tabs and buttons
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(t => t.classList.remove('active'));

        // Add active class to clicked button and target tab
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});

// 1. STATE & DATA
const state = {
    level: 12,
    stats: {
        STR: 45,
        AGI: 30, // Weakest
        STA: 50,
        INT: 60,
        AWR: 55,
        DIS: 40
    },
    tasks: [
        { id: 1, title: "MANDATORY CODING", meta: "DSA / LEETCODE", stat: "INT", completed: false },
        { id: 2, title: "100 PUSH-UPS", meta: "TIER 2 - ADAPTIVE", stat: "STR", completed: false },
        { id: 3, title: "10 MIN STRETCHING", meta: "RECOVERY", stat: "AGI", completed: false }
    ],
    penaltyActive: false
};

const STAT_ORDER = ['STR', 'AGI', 'STA', 'INT', 'AWR', 'DIS'];

// 2. BACKGROUND — Scratched Dark Metal / Stone Texture
// Faithfully matches the Solo Leveling system screen background:
// Dark charcoal-steel base, dense micro-scratches, few long diagonal streaks, subtle vignette
const canvasBg = document.getElementById('bg-canvas');
const ctxBg = canvasBg.getContext('2d');

function resizeCanvas() {
    const wrapper = document.getElementById('mobile-wrapper');
    canvasBg.width = wrapper.clientWidth;
    canvasBg.height = wrapper.clientHeight;
    buildTexture();
}
window.addEventListener('resize', resizeCanvas);

let microScratches = []; // Hundreds of tiny near-invisible marks
let longStreaks = [];     // Handful of long diagonal/horizontal scratches

function buildTexture() {
    const w = canvasBg.width;
    const h = canvasBg.height;
    microScratches = [];
    longStreaks = [];

    // --- Micro scratches: 3000 tiny random marks for ultra-dense worn metal texture ---
    for (let i = 0; i < 3000; i++) {
        const angle = (Math.random() - 0.5) * 0.7 + (Math.random() > 0.5 ? 0 : Math.PI); // mostly horizontal-ish
        const len = Math.random() * 28 + 4; // 4–32px
        microScratches.push({
            x: Math.random() * w,
            y: Math.random() * h,
            angle,
            len,
            alpha: Math.random() * 0.12 + 0.02, // slightly brighter to show tint
            width: Math.random() * 0.5 + 0.2,    // hairline thin
        });
    }


    // --- Long streaks: 25–40 longer marks, like deep surface scratches ---
    for (let i = 0; i < 32; i++) {
        const angle = (Math.random() - 0.5) * 0.4; // mostly horizontal, slight diagonal
        const len = Math.random() * 300 + 100; // 100–400px
        longStreaks.push({
            x: Math.random() * w,
            y: Math.random() * h,
            angle,
            len,
            alpha: Math.random() * 0.18 + 0.04, // bright enough to glow
            width: Math.random() * 0.8 + 0.3,
        });
    }
}

resizeCanvas();

let time = 0;

// Flow animation state
let flowX = 0;
let flowY = 0;
const FLOW_SPEED_X = 0.45;  // Drifting right
const FLOW_SPEED_Y = -0.25; // Drifting slightly up

// Light sweep bands — slow diagonal light reflections gliding across the surface
const sweeps = [
    { pos: 0.15, speed: 0.00028, angle: -0.3, width: 0.12 },  // slow sweep going right
    { pos: 0.72, speed: 0.00018, angle:  0.2, width: 0.08 },  // slightly slower, different angle
];

// Pre-render micro and medium scratches to offscreen canvas for performance
let offscreen = null;
let offscreenBuilt = false;

function buildOffscreen(w, h) {
    offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const oct = offscreen.getContext('2d');
    
    const drawToOffscreen = (s) => {
        const drawScratch = (x, y) => {
            const dx = Math.cos(s.angle) * s.len * 0.5;
            const dy = Math.sin(s.angle) * s.len * 0.5;
            oct.beginPath();
            oct.moveTo(x - dx, y - dy);
            oct.lineTo(x + dx, y + dy);
            // System blue tint! (rgba(100, 190, 255))
            oct.strokeStyle = `rgba(100, 190, 255, ${s.alpha})`;
            oct.lineWidth = s.width;
            oct.lineCap = 'round';
            oct.stroke();
        };

        drawScratch(s.x, s.y);
        
        // Draw wrapped clones at the edges so the texture tiles seamlessly when flowing
        const pad = s.len;
        if (s.x < pad) drawScratch(s.x + w, s.y);
        if (s.x > w - pad) drawScratch(s.x - w, s.y);
        if (s.y < pad) drawScratch(s.x, s.y + h);
        if (s.y > h - pad) drawScratch(s.x, s.y - h);
    };

    microScratches.forEach(drawToOffscreen);
    offscreenBuilt = true;
}

function animateBackground() {
    const w = canvasBg.width;
    const h = canvasBg.height;
    ctxBg.clearRect(0, 0, w, h);

    // Update global flow
    flowX += FLOW_SPEED_X;
    flowY += FLOW_SPEED_Y;
    
    // Keep flow within bounds for seamless tiling
    if (flowX > w) flowX -= w;
    if (flowX < 0) flowX += w;
    if (flowY > h) flowY -= h;
    if (flowY < 0) flowY += h;

    // 1. Deep dark navy base
    ctxBg.fillStyle = '#090d18';
    ctxBg.fillRect(0, 0, w, h);

    // 2. Breathing ambient glow — slowly pulses in size and shifts position
    const breathe     = Math.sin(time * 0.008) * 0.5 + 0.5;   // 0→1 cycle ~13s
    const glowX       = w * (0.48 + Math.sin(time * 0.003) * 0.06);
    const glowY       = h * (0.45 + Math.cos(time * 0.004) * 0.05);
    const glowRadius  = w * (0.55 + breathe * 0.15);
    const glowAlpha   = 0.28 + breathe * 0.18;

    const centerGlow = ctxBg.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
    centerGlow.addColorStop(0,   `rgba(15, 30, 55, ${glowAlpha})`);
    centerGlow.addColorStop(0.6, `rgba(10, 18, 35, ${glowAlpha * 0.3})`);
    centerGlow.addColorStop(1,   'rgba(0, 0, 0, 0)');
    ctxBg.fillStyle = centerGlow;
    ctxBg.fillRect(0, 0, w, h);

    // 3. Edge vignette (static)
    const vig = ctxBg.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.95);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    ctxBg.fillStyle = vig;
    ctxBg.fillRect(0, 0, w, h);

    // 4. Draw flowing micro and medium scratches seamlessly
    if (!offscreenBuilt) buildOffscreen(w, h);
    
    // Draw 4 overlapping tiles to handle the wrapping flow
    ctxBg.drawImage(offscreen, flowX, flowY);
    ctxBg.drawImage(offscreen, flowX - w, flowY);
    ctxBg.drawImage(offscreen, flowX, flowY - h);
    ctxBg.drawImage(offscreen, flowX - w, flowY - h);

    // 5. Long streaks flowing with independent shimmer
    longStreaks.forEach((s, i) => {
        // Move with the flow (parallax could be added here by modifying speed, but unified is requested)
        s.x += FLOW_SPEED_X;
        s.y += FLOW_SPEED_Y;

        // Wrap individually
        if (s.x > w + s.len) s.x -= (w + s.len * 2);
        if (s.x < -s.len) s.x += (w + s.len * 2);
        if (s.y > h + s.len) s.y -= (h + s.len * 2);
        if (s.y < -s.len) s.y += (h + s.len * 2);

        // Each streak has its own slow shimmer cycle
        const shimmer = Math.sin(time * 0.004 + i * 1.3) * 0.5 + 0.5;
        const a = s.alpha * (0.4 + shimmer * 0.6);

        const dx = Math.cos(s.angle) * s.len * 0.5;
        const dy = Math.sin(s.angle) * s.len * 0.5;

        const grd = ctxBg.createLinearGradient(s.x - dx, s.y - dy, s.x + dx, s.y + dy);
        grd.addColorStop(0,   'rgba(100, 190, 255, 0)');
        grd.addColorStop(0.2, `rgba(100, 190, 255, ${a})`);
        grd.addColorStop(0.8, `rgba(100, 190, 255, ${a})`);
        grd.addColorStop(1,   'rgba(100, 190, 255, 0)');

        ctxBg.beginPath();
        ctxBg.moveTo(s.x - dx, s.y - dy);
        ctxBg.lineTo(s.x + dx, s.y + dy);
        ctxBg.strokeStyle = grd;
        ctxBg.lineWidth = s.width;
        ctxBg.lineCap = 'round';
        ctxBg.stroke();
    });

    // 6. Diagonal light sweeps
    sweeps.forEach(sw => {
        sw.pos += sw.speed;
        if (sw.pos > 1.2) sw.pos = -0.2;

        const cx = w * sw.pos;
        const bandW = w * sw.width;

        ctxBg.save();
        ctxBg.translate(cx, 0);
        ctxBg.rotate(sw.angle);

        const sweep = ctxBg.createLinearGradient(-bandW, 0, bandW, 0);
        sweep.addColorStop(0,   'rgba(140, 180, 220, 0)');
        sweep.addColorStop(0.5, 'rgba(140, 180, 220, 0.045)');
        sweep.addColorStop(1,   'rgba(140, 180, 220, 0)');

        ctxBg.fillStyle = sweep;
        ctxBg.fillRect(-bandW, -h, bandW * 2, h * 3);
        ctxBg.restore();
    });

    time++;
    requestAnimationFrame(animateBackground);
}
animateBackground();



// 3. STATS & TASKS LOGIC
const stats = {
    STR: 48,
    AGI: 27,
    STA: 27, // Referred to as VIT or PER depending on the translation, we'll keep the logic generic
    INT: 27,
    AWR: 27,
    DIS: 27
};

function findWeakestStat() {
    let weakest = 'STR';
    let minVal = 1000;
    for (const key in state.stats) {
        if (state.stats[key] < minVal) {
            minVal = state.stats[key];
            weakest = key;
        }
    }
    document.getElementById('weakest-stat-label').innerText = weakest;
}

// 4. TASK RENDERING
const taskListEl = document.getElementById('task-list');

function renderTasks() {
    taskListEl.innerHTML = '';
    state.tasks.forEach((task, index) => {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.innerHTML = `
            <div class="task-checkbox"></div>
            <div class="task-details">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span class="task-stat-tag">+1 ${task.stat}</span>
                    <span>${task.meta}</span>
                </div>
            </div>
        `;
        
        taskEl.addEventListener('click', () => handleTaskClick(index));
        taskListEl.appendChild(taskEl);
    });
}

function handleTaskClick(index) {
    if (state.tasks[index].completed) return; // already done

    // Micro-verification
    const confirm = window.confirm(`CONFIRM COMPLETION: ${state.tasks[index].title}\nAre you sure you completed this task?`);
    if (confirm) {
        state.tasks[index].completed = true;
        // Increase stat
        state.stats[state.tasks[index].stat] += 2;
        
        renderTasks();
        drawRadarChart();
        findWeakestStat();
    }
}


// 5. COUNTDOWN TIMER & PENALTY TRIGGER
const countdownEl = document.getElementById('countdown-timer');
let debugMode = true; // Set false to use actual midnight

function updateTimer() {
    const now = new Date();
    
    // Target is midnight today
    const target = new Date();
    target.setHours(23, 59, 59, 999);
    
    let diff = target - now;
    
    // For quick testing, let's allow a hidden click on the timer to trigger penalty
    if(diff < 0) diff = 0;

    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

setInterval(updateTimer, 1000);
updateTimer();

// Debug: Click the timer to force a penalty
countdownEl.addEventListener('click', () => {
    triggerPenalty();
});


// 6. PENALTY SYSTEM
const penaltyOverlay = document.getElementById('penalty-overlay');
const btnAccept = document.getElementById('btn-accept-penalty');
const penaltyCompletionSection = document.getElementById('penalty-completion-section');
const btnComplete = document.getElementById('btn-complete-penalty');
const resetOverlay = document.getElementById('reset-overlay');

function triggerPenalty() {
    if (state.penaltyActive) return;
    state.penaltyActive = true;
    penaltyOverlay.classList.add('active');
    btnAccept.style.display = 'block';
    penaltyCompletionSection.style.display = 'none';
}

btnAccept.addEventListener('click', () => {
    btnAccept.style.display = 'none';
    penaltyCompletionSection.style.display = 'block';
});

btnComplete.addEventListener('click', () => {
    const verified = window.confirm("VERIFICATION REQUIRED: Have you completed the penalty task in reality?");
    if (verified) {
        penaltyOverlay.classList.remove('active');
        state.penaltyActive = false;
        
        // Show Reset Overlay
        resetOverlay.classList.add('active');
        setTimeout(() => {
            resetOverlay.classList.remove('active');
        }, 3000);
    }
});


// INIT
renderTasks();
