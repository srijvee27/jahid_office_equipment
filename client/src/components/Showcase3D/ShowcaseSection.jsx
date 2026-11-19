import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { trackModelSelect, trackPartHover, trackPartClick, trackQuoteSubmit } from '../../analytics';

export const MODELS = [
  { name: "e-STUDIO2528A", fullName: "Toshiba e-STUDIO2528A", speed: "25 ppm", ram: "4 GB", firstCopy: "4.3s", weight: "55 kg", price: "৳ 3,75,000", priceNum: 375000 },
  { name: "e-STUDIO3028A", fullName: "Toshiba e-STUDIO3028A", speed: "30 ppm", ram: "4 GB", firstCopy: "4.3s", weight: "55 kg", price: "৳ 4,20,000", priceNum: 420000 },
  { name: "e-STUDIO3528A", fullName: "Toshiba e-STUDIO3528A", speed: "35 ppm", ram: "4 GB", firstCopy: "3.6s", weight: "57 kg", price: "৳ 4,85,000", priceNum: 485000 },
  { name: "e-STUDIO4528A", fullName: "Toshiba e-STUDIO4528A", speed: "45 ppm", ram: "4 GB", firstCopy: "3.6s", weight: "57 kg", price: "৳ 5,60,000", priceNum: 560000 },
  { name: "e-STUDIO5528A", fullName: "Toshiba e-STUDIO5528A", speed: "55 ppm", ram: "6 GB", firstCopy: "4.3s", weight: "72 kg", price: "৳ 6,90,000", priceNum: 690000 },
  { name: "e-STUDIO6528A", fullName: "Toshiba e-STUDIO6528A", speed: "65 ppm", ram: "6 GB", firstCopy: "4.3s", weight: "72 kg", price: "৳ 7,95,000", priceNum: 795000 }
];

export const PARTS_DATA = {
  dsdf: {
    key: 'dsdf',
    name: "Dual Scan Document Feeder (DSDF)",
    code: "MR-4010 / MR-4020",
    category: "External Module",
    price: "৳ 1,06,500",
    priceNum: 106500,
    shortDesc: "300-sheet capacity, duplex scans up to 240 ipm.",
    fullSpecs: "Holds up to 300 originals (A5R-A3, 35-209 g/m²). Single-pass dual-side scanning at 240 ipm with optional Double Feed Detection.",
    explode: new THREE.Vector3(0, 1.35, 0),
    stage: "external"
  },
  panel: {
    key: 'panel',
    name: "10.1\" Multi-Touch Control Panel",
    code: "e-BRIDGE Next UI Panel",
    category: "External / Spare",
    price: "৳ 34,500",
    priceNum: 34500,
    shortDesc: "26 cm tiltable tablet-style colour touch screen.",
    fullSpecs: "Customisable multi-touch colour display with embedded web browser, workflow shortcuts, and physical Start/Stop keys.",
    explode: new THREE.Vector3(1.15, 0.55, 1.15),
    stage: "external"
  },
  finisher: {
    key: 'finisher',
    name: "Saddle Stitch Finisher (3,250-Sheet)",
    code: "MJ-1116 + Hole Punch",
    category: "External Module",
    price: "৳ 1,95,000",
    priceNum: 195000,
    shortDesc: "60-page booklet maker + 50-sheet multi-position stapler.",
    fullSpecs: "2 output trays, 3,250-sheet capacity, 50-sheet stapling, and optional 2/4 hole punching unit.",
    explode: new THREE.Vector3(-1.55, 0.05, 0),
    stage: "external"
  },
  pedestal: {
    key: 'pedestal',
    name: "Paper Feed Pedestal & Drawers",
    code: "KD-1072 + MY-1052",
    category: "External Module",
    price: "৳ 46,200",
    priceNum: 46200,
    shortDesc: "550-sheet cassette drawers (A5R-A3, 60-163 g/m²).",
    fullSpecs: "Expandable lower paper feed pedestal with heavy-duty caster wheels and A4/A3/B4 size indicators.",
    explode: new THREE.Vector3(0, -1.15, 0.25),
    stage: "external"
  },
  drum: {
    key: 'drum',
    name: "Process / Drum + Developer Unit",
    code: "6LL51753400 / EPU-K166K",
    category: "Internal Spare Part",
    price: "৳ 42,500",
    priceNum: 42500,
    shortDesc: "Photoconductor drum & developer assembly for sharp prints.",
    fullSpecs: "Replace when prints appear faded, show vertical lines, or drum counter reaches end-of-life.",
    explode: new THREE.Vector3(1.25, 0.15, 1.45),
    stage: "internal"
  },
  fuser: {
    key: 'fuser',
    name: "Fuser Unit (Heater Section)",
    code: "6LL51810000",
    category: "Internal Spare Part",
    price: "৳ 54,000",
    priceNum: 54000,
    shortDesc: "220V fixing assembly that bonds toner onto paper.",
    fullSpecs: "High-precision heat & pressure roller assembly. Replace if paper jams at exit or toner rubs off.",
    explode: new THREE.Vector3(-0.95, 0.25, 1.55),
    stage: "internal"
  },
  belt: {
    key: 'belt',
    name: "Transfer Belt Assembly",
    code: "6LL44835000",
    category: "Internal Spare Part",
    price: "৳ 36,500",
    priceNum: 36500,
    shortDesc: "Image transfer belt unit for clean, streak-free output.",
    fullSpecs: "OEM-grade transfer belt stretched on precision rollers. Replace when belt surface wears out.",
    explode: new THREE.Vector3(0.05, -0.35, 1.75),
    stage: "internal"
  },
  toner: {
    key: 'toner',
    name: "Original Black Toner Cartridge",
    code: "T-3028P / T-3028C",
    category: "Consumable",
    price: "৳ 14,500",
    priceNum: 14500,
    shortDesc: "High-yield original Toshiba black toner (~36,000 pages).",
    fullSpecs: "Genuine monochrome laser toner cartridge engineered for crisp text and deep blacks.",
    explode: new THREE.Vector3(1.55, 0.85, 0.85),
    stage: "internal"
  },
  roller: {
    key: 'roller',
    name: "Paper Pickup & Feed Roller Kit",
    code: "CST-H21X / 6LJ56845000",
    category: "Internal Spare Part",
    price: "৳ 4,200",
    priceNum: 4200,
    shortDesc: "3-piece cassette pickup, feed & separation rubber rollers.",
    fullSpecs: "Solves paper misfeed, skewing, and multi-sheet feed issues in paper drawers.",
    explode: new THREE.Vector3(0.75, -0.85, 1.4),
    stage: "internal"
  }
};

function createScreenTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 300;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 300);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, 0, 512, 46);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('TOSHIBA  e-BRIDGE Next', 20, 30);
  const tiles = [
    { x: 30, y: 75, col: '#0ea5e9', txt: 'COPY' },
    { x: 150, y: 75, col: '#10b981', txt: 'SCAN' },
    { x: 270, y: 75, col: '#6366f1', txt: 'PRINT' },
    { x: 390, y: 75, col: '#f59e0b', txt: 'FAX' },
    { x: 30, y: 180, col: '#334155', txt: 'e-FILING' },
    { x: 150, y: 180, col: '#334155', txt: 'USB' },
    { x: 270, y: 180, col: '#334155', txt: 'CLOUD' },
    { x: 390, y: 180, col: '#ef4444', txt: 'START' },
  ];
  tiles.forEach((t) => {
    ctx.fillStyle = t.col;
    ctx.beginPath();
    ctx.roundRect(t.x, t.y, 96, 82, 10);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(t.txt, t.x + 18, t.y + 48);
  });
  return new THREE.CanvasTexture(c);
}

export default function ShowcaseSection() {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);

  // Active Model State (default e-STUDIO6528A as in reference)
  const [activeModel, setActiveModel] = useState(MODELS[5]);
  const [sliderVal, setSliderVal] = useState(0);
  const [stageText, setStageText] = useState('Stage 1: Assembled Machine');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Tooltip State
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Modal State
  const [modalPart, setModalPart] = useState(null);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    quantity: 1,
    message: ''
  });

  // Three.js internal references
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    interactiveGroups: [],
    frontDoor: null,
    copierRoot: null,
    defaultCamPos: new THREE.Vector3(3.4, 2.1, 4.6),
    targetCamPos: new THREE.Vector3(3.4, 2.1, 4.6),
    targetLookAt: new THREE.Vector3(0, 0.2, 0),
    scrollProgress: 0,
    targetProgress: 0,
    autoPlaying: false,
    autoDir: 1,
    hoveredKey: null,
    tappedKey: null,
    animFrameId: null
  });

  // 1. Initialize Three.js Scene Exactly as Reference HTML
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const t = threeRef.current;
    const scene = new THREE.Scene();
    t.scene = scene;

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.copy(t.defaultCamPos);
    t.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    t.renderer = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; // Keep page scroll smooth!
    controls.target.set(0, 0.2, 0);
    t.controls = controls;

    // Studio Lighting (Clean White Theme)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcbd5e1, 1.3);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Ground Shadow Receiver
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.42;
    floor.receiveShadow = true;
    scene.add(floor);

    // Build Toshiba Copier Group
    const copierRoot = new THREE.Group();
    scene.add(copierRoot);
    t.copierRoot = copierRoot;

    // Materials
    const matCharcoal = new THREE.MeshStandardMaterial({ color: 0x1e2329, roughness: 0.45, metalness: 0.15 });
    const matDarkGrey = new THREE.MeshStandardMaterial({ color: 0x2b323b, roughness: 0.5, metalness: 0.2 });
    const matSilver = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.8 });
    const matRedBadge = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, metalness: 0.2 });
    const matBlueLED = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.8 });
    const matDrumGreen = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.18, metalness: 0.75 });
    const matFuserRed = new THREE.MeshStandardMaterial({ color: 0xea580c, emissive: 0x9a3412, emissiveIntensity: 0.35, roughness: 0.3 });

    t.interactiveGroups = [];
    function registerPart(key, group) {
      group.userData.partKey = key;
      group.userData.basePos = group.position.clone();
      group.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData.partKey = key;
        }
      });
      t.interactiveGroups.push(group);
      copierRoot.add(group);
      return group;
    }

    // A. MAIN CHASSIS
    const chassisGroup = new THREE.Group();
    const lowerCore = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.72, 1.05), matCharcoal);
    lowerCore.position.set(0, -0.05, 0);
    chassisGroup.add(lowerCore);

    const upperBridge = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.22, 1.05), matCharcoal);
    upperBridge.position.set(0, 0.62, 0);
    chassisGroup.add(upperBridge);

    const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, 1.05), matDarkGrey);
    rightPillar.position.set(0.415, 0.34, 0);
    chassisGroup.add(rightPillar);

    const backPillar = new THREE.Mesh(new THREE.BoxGeometry(0.83, 0.45, 0.25), matDarkGrey);
    backPillar.position.set(-0.16, 0.34, -0.4);
    chassisGroup.add(backPillar);

    const silverStrip = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.03, 0.03), matSilver);
    silverStrip.position.set(0, 0.31, 0.525);
    chassisGroup.add(silverStrip);

    const logoBadge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, 0.02), matRedBadge);
    logoBadge.position.set(-0.38, 0.22, 0.53);
    chassisGroup.add(logoBadge);

    const statusLED = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.02), matBlueLED);
    statusLED.position.set(0.42, 0.22, 0.53);
    chassisGroup.add(statusLED);

    // Front Service Door
    const frontDoor = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.55, 0.04), matDarkGrey);
    frontDoor.position.set(0, -0.02, 0.525);
    chassisGroup.add(frontDoor);
    t.frontDoor = frontDoor;

    chassisGroup.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
    copierRoot.add(chassisGroup);

    // B. DSDF TOP DOCUMENT FEEDER
    const dsdf = registerPart('dsdf', new THREE.Group());
    dsdf.position.set(0, 0.82, 0);
    const dsdfBase = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.16, 0.98), matCharcoal);
    const dsdfTray = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.72), matDarkGrey);
    dsdfTray.position.set(-0.22, 0.11, 0);
    dsdfTray.rotation.z = 0.16;
    const dsdfGuide = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.04), matSilver);
    dsdfGuide.position.set(-0.22, 0.14, 0.28);
    dsdf.add(dsdfBase, dsdfTray, dsdfGuide);

    // C. 10.1" TOUCH CONTROL PANEL
    const panel = registerPart('panel', new THREE.Group());
    panel.position.set(0.40, 0.56, 0.62);
    const panelBody = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.04), matCharcoal);
    panelBody.rotation.x = -0.55;
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.20),
      new THREE.MeshBasicMaterial({ map: createScreenTexture() })
    );
    screenMesh.position.set(0, 0.012, 0.022);
    screenMesh.rotation.x = -0.55;
    panel.add(panelBody, screenMesh);

    // D. PAPER FEED PEDESTAL
    const pedestal = registerPart('pedestal', new THREE.Group());
    pedestal.position.set(0, -0.85, 0);
    for (let i = 0; i < 3; i++) {
      const drawer = new THREE.Mesh(
        new THREE.BoxGeometry(1.14, 0.22, 1.04),
        i % 2 === 0 ? matDarkGrey : matCharcoal
      );
      drawer.position.set(0, 0.28 - i * 0.25, 0);
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.03), matSilver);
      handle.position.set(0, 0.28 - i * 0.25, 0.525);
      pedestal.add(drawer, handle);
    }
    // 4 Caster Wheels
    [[-0.45, -0.4], [0.45, -0.4], [-0.45, 0.4], [0.45, 0.4]].forEach(([wx, wz]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.05, 16), matSilver);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, -0.48, wz);
      pedestal.add(wheel);
    });

    // E. SADDLE STITCH FINISHER
    const finisher = registerPart('finisher', new THREE.Group());
    finisher.position.set(-0.88, -0.22, 0);
    const finTower = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.38, 0.88), matCharcoal);
    const finTray1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.65), matDarkGrey);
    finTray1.position.set(-0.35, 0.35, 0);
    finTray1.rotation.z = -0.22;
    const finTray2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.65), matDarkGrey);
    finTray2.position.set(-0.35, -0.05, 0);
    finTray2.rotation.z = -0.22;
    finisher.add(finTower, finTray1, finTray2);

    // F. INTERNAL SPARE PARTS
    function registerInternal(key, group, pos) {
      group.position.copy(pos);
      group.visible = false;
      return registerPart(key, group);
    }

    // Drum + Developer Unit
    const drumGrp = new THREE.Group();
    const drumCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.65, 24), matDrumGreen);
    drumCyl.rotation.z = Math.PI / 2;
    const drumHousing = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.14, 0.22), matDarkGrey);
    drumHousing.position.set(0, -0.04, -0.05);
    drumGrp.add(drumCyl, drumHousing);
    registerInternal('drum', drumGrp, new THREE.Vector3(0.05, 0.05, 0.1));

    // Fuser Unit
    const fuserGrp = new THREE.Group();
    const fuserBody = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.16, 0.24), matCharcoal);
    const fuserRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.60, 20), matFuserRed);
    fuserRoller.rotation.z = Math.PI / 2;
    fuserRoller.position.set(0, 0.04, 0.06);
    fuserGrp.add(fuserBody, fuserRoller);
    registerInternal('fuser', fuserGrp, new THREE.Vector3(-0.08, 0.15, -0.05));

    // Transfer Belt
    const beltGrp = new THREE.Group();
    const beltMesh = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.07, 0.56), matDarkGrey);
    const beltRim = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.03, 0.58), matSilver);
    beltGrp.add(beltMesh, beltRim);
    registerInternal('belt', beltGrp, new THREE.Vector3(0, -0.10, 0));

    // Toner Cartridge
    const tonerGrp = new THREE.Group();
    const tonerTube = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.58, 24), matCharcoal);
    tonerTube.rotation.z = Math.PI / 2;
    const tonerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.08, 24), matBlueLED);
    tonerCap.rotation.z = Math.PI / 2;
    tonerCap.position.x = 0.27;
    tonerGrp.add(tonerTube, tonerCap);
    registerInternal('toner', tonerGrp, new THREE.Vector3(0.12, 0.22, 0.20));

    // Pickup Roller Kit
    const rollerGrp = new THREE.Group();
    for (let r = -1; r <= 1; r++) {
      const rl = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.08, 18), matSilver);
      rl.rotation.x = Math.PI / 2;
      rl.position.x = r * 0.14;
      rollerGrp.add(rl);
    }
    registerInternal('roller', rollerGrp, new THREE.Vector3(0.1, -0.25, 0.2));

    // Raycasting & Pointer Setup
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function getPartKeyFromEvent(clientX, clientY) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(t.interactiveGroups, true);
      if (hits.length > 0) {
        const obj = hits[0].object;
        if (obj.visible && obj.parent && obj.parent.visible) {
          return obj.userData.partKey || obj.parent.userData.partKey;
        }
      }
      return null;
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      const key = getPartKeyFromEvent(e.clientX, e.clientY);
      t.hoveredKey = key;
      if (key && PARTS_DATA[key]) {
        renderer.domElement.style.cursor = 'pointer';
        setTooltipData(PARTS_DATA[key]);
        setTooltipPos({
          x: Math.min(window.innerWidth - 270, e.clientX + 16),
          y: Math.max(80, e.clientY - 115)
        });
        trackPartHover(key, PARTS_DATA[key].name);
      } else {
        renderer.domElement.style.cursor = 'grab';
        setTooltipData(null);
      }
    };

    const onClick = (e) => {
      const key = getPartKeyFromEvent(e.clientX, e.clientY);
      if (!key || !PARTS_DATA[key]) {
        setTooltipData(null);
        t.tappedKey = null;
        return;
      }
      if (window.innerWidth < 1024 && t.tappedKey !== key) {
        // 1st tap on mobile/tablet shows tooltip first
        t.tappedKey = key;
        setTooltipData(PARTS_DATA[key]);
        setTooltipPos({
          x: Math.min(window.innerWidth - 270, e.clientX + 16),
          y: Math.max(80, e.clientY - 115)
        });
        return;
      }
      // 2nd tap on mobile or direct click on desktop opens modal
      setTooltipData(null);
      openPartModal(key);
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // Animation Loop
    function animate() {
      t.animFrameId = requestAnimationFrame(animate);

      if (t.autoPlaying) {
        t.targetProgress += 0.0035 * t.autoDir;
        if (t.targetProgress >= 1) {
          t.targetProgress = 1;
          t.autoDir = -1;
        }
        if (t.targetProgress <= 0) {
          t.targetProgress = 0;
          t.autoDir = 1;
        }
        setSliderVal(Math.round(t.targetProgress * 100));
        updateStageLabel(t.targetProgress);
      }

      t.scrollProgress += (t.targetProgress - t.scrollProgress) * 0.08;
      const sp = t.scrollProgress;

      // Gentle hero rotation when assembled
      copierRoot.rotation.y = Math.sin(sp * Math.PI) * 0.28 - 0.15;

      // Front door opens smoothly after 45% scroll
      const doorT = Math.max(0, Math.min(1, (sp - 0.42) / 0.25));
      frontDoor.position.z = 0.525 + doorT * 0.5;
      frontDoor.material.transparent = true;
      frontDoor.material.opacity = 1 - doorT * 0.88;

      // Animate External & Internal Parts
      t.interactiveGroups.forEach((grp) => {
        const key = grp.userData.partKey;
        const data = PARTS_DATA[key];
        if (!data) return;

        let partT = 0;
        if (data.stage === 'external') {
          partT = Math.max(0, Math.min(1, (sp - 0.12) / 0.45));
        } else {
          partT = Math.max(0, Math.min(1, (sp - 0.50) / 0.45));
          grp.visible = sp > 0.46;
        }
        grp.position.copy(grp.userData.basePos).addScaledVector(data.explode, partT);

        // Highlight hovered or tapped part
        const isHov = t.hoveredKey === key || t.tappedKey === key;
        grp.scale.setScalar(isHov ? 1.05 : 1.0);
      });

      // Smooth Camera Zoom
      camera.position.lerp(t.targetCamPos, 0.07);
      controls.target.lerp(t.targetLookAt, 0.07);
      controls.update();

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Page Scroll Sync with the 360vh Track
    const onWindowScroll = () => {
      if (t.autoPlaying || !scrollSectionRef.current) return;
      const sec = scrollSectionRef.current;
      const rect = sec.getBoundingClientRect();
      const topOffset = -rect.top;
      const totalScrollable = sec.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const p = Math.min(1, Math.max(0, topOffset / totalScrollable));
      t.targetProgress = p;
      setSliderVal(Math.round(p * 100));
      updateStageLabel(p);
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    return () => {
      cancelAnimationFrame(t.animFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onWindowScroll);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      controls.dispose();
      scene.clear();
    };
  }, []);

  function updateStageLabel(val) {
    if (val < 0.2) setStageText('Stage 1: Assembled Machine');
    else if (val < 0.55) setStageText('Stage 2: External Modular Options Separating');
    else setStageText('Stage 3: Internal Spare Parts Exposed');
  }

  // Zoom camera toward part & Open Modal
  function openPartModal(key) {
    const data = PARTS_DATA[key];
    if (!data) return;
    const t = threeRef.current;
    const grp = t.interactiveGroups.find((g) => g.userData.partKey === key);
    if (grp) {
      const worldPos = new THREE.Vector3();
      grp.getWorldPosition(worldPos);
      t.targetLookAt.copy(worldPos);
      t.targetCamPos.copy(worldPos).add(new THREE.Vector3(1.4, 0.8, 2.0));
    }
    setModalPart(data);
    setQuoteSuccess(false);
    trackPartClick(key, data.name, data.priceNum);
  }

  function handleResetView() {
    const t = threeRef.current;
    t.autoPlaying = false;
    setIsAutoPlaying(false);
    t.targetProgress = 0;
    t.targetCamPos.copy(t.defaultCamPos);
    t.targetLookAt.set(0, 0.2, 0);
    setSliderVal(0);
    updateStageLabel(0);
  }

  function handleToggleAutoPlay() {
    const t = threeRef.current;
    t.autoPlaying = !t.autoPlaying;
    setIsAutoPlaying(t.autoPlaying);
  }

  function handleSliderChange(e) {
    const t = threeRef.current;
    t.autoPlaying = false;
    setIsAutoPlaying(false);
    const p = parseFloat(e.target.value) / 100;
    t.targetProgress = p;
    setSliderVal(Math.round(p * 100));
    updateStageLabel(p);
  }

  function handleSelectModel(m) {
    setActiveModel(m);
    trackModelSelect(m.name, m.fullName);
  }

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!modalPart) return;
    setQuoteSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteForm.name,
          phone: quoteForm.phone,
          email: quoteForm.email,
          company: quoteForm.company,
          quantity: quoteForm.quantity,
          itemType: 'part',
          itemName: modalPart.name,
          partNumber: modalPart.code,
          modelSlug: activeModel.name,
          message: quoteForm.message
        })
      });
      if (res.ok) {
        setQuoteSuccess(true);
        trackQuoteSubmit(modalPart.name, 'part', quoteForm.email);
      }
    } catch (err) {
      setQuoteSuccess(true);
      trackQuoteSubmit(modalPart.name, 'part', quoteForm.email);
    } finally {
      setQuoteSubmitting(false);
    }
  };

  return (
    <section id="showcase" className="relative w-full">
      {/* 360vh Scroll Section */}
      <div className="relative h-[360vh]" ref={scrollSectionRef}>
        {/* Sticky 100vh Fullscreen Stage */}
        <div className="sticky top-0 w-full h-screen bg-[radial-gradient(circle_at_55%_45%,#ffffff_0%,#eff6ff_55%,#e2e8f0_100%)] overflow-hidden">
          {/* Canvas Container */}
          <div ref={containerRef} id="canvas-container" className="w-full h-full" />

          {/* Left Model HUD Overlay (White Studio Style) */}
          <div className="absolute top-[86px] left-6 z-20 max-w-[340px] bg-white/92 backdrop-blur-md border border-slate-200 border-l-4 border-l-[#0066cc] rounded-xl p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] pointer-events-auto">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0066cc] bg-[#e0f2fe] px-2 py-0.5 rounded-full mb-1.5 font-mono">
              A3 Monochrome MFP
            </span>
            <div className="text-xl font-extrabold text-[#0f172a] leading-tight">
              {activeModel.fullName}
            </div>
            <div className="text-lg font-extrabold text-[#0066cc] my-1">
              {activeModel.price}
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#475569] mb-3">
              <span>Speed: <strong className="text-[#0f172a]">{activeModel.speed}</strong></span>
              <span>RAM: <strong className="text-[#0f172a]">{activeModel.ram}</strong></span>
              <span>First Copy: <strong className="text-[#0f172a]">{activeModel.firstCopy}</strong></span>
              <span>Weight: <strong className="text-[#0f172a]">{activeModel.weight}</strong></span>
            </div>

            {/* Model Switcher Pills inside HUD */}
            <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-slate-100">
              {MODELS.map((m) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => handleSelectModel(m)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition border ${
                    activeModel.name === m.name
                      ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#0066cc]'
                  }`}
                >
                  {m.name.replace('e-STUDIO', '')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleAutoPlay}
                className="bg-[#0066cc] hover:bg-[#0052a3] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition"
              >
                {isAutoPlaying ? '⏸ Pause Tour' : '▶ Auto-Play 3D Tour'}
              </button>
              <button
                type="button"
                onClick={handleResetView}
                className="bg-white hover:bg-slate-50 text-[#0066cc] border border-[#0066cc] text-xs font-semibold px-3 py-2 rounded-lg transition"
              >
                Reset View
              </button>
            </div>
          </div>

          {/* Bottom Scrub Slider HUD */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[min(560px,92vw)] bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-[#0066cc]">{stageText}</span>
              <span className="font-mono text-slate-700">{sliderVal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={handleSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066cc]"
              aria-label="Explosion scrub slider"
            />
            <div className="text-center text-[11px] text-[#475569] mt-1 font-medium">
              Scroll page or drag slider to separate parts • Hover/Tap for price • Click for details
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip (Message Style) */}
      {tooltipData && (
        <div
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`
          }}
          className="fixed z-50 pointer-events-none max-w-[260px] bg-white/98 border-[1.5px] border-[#0066cc] rounded-xl p-3 shadow-[0_12px_28px_rgba(0,102,204,0.18)] transition-all duration-75 text-left"
        >
          <div className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider font-mono">
            {tooltipData.category}
          </div>
          <div className="text-xs font-bold text-[#0f172a] my-0.5 leading-tight">
            {tooltipData.name}
          </div>
          <div className="text-[11px] text-[#475569] leading-tight mb-1.5">
            {tooltipData.shortDesc}
          </div>
          <div className="text-sm font-extrabold text-[#0066cc]">
            {tooltipData.price}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Click to zoom &amp; view full specs
          </div>
          {/* Triangular pointer arrow */}
          <div className="absolute -bottom-[7px] left-5 w-3 h-3 bg-white border-r-[1.5px] border-r-[#0066cc] border-b-[1.5px] border-b-[#0066cc] rotate-45" />
        </div>
      )}

      {/* Enlarged Detail Modal */}
      {modalPart && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalPart(null)}
        >
          <div
            className="bg-white w-[min(540px,100%)] rounded-2xl border border-slate-200 shadow-[0_24px_50px_rgba(15,23,42,0.22)] overflow-hidden animate-fadeIn my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0066cc] to-[#0284c7] text-white p-5 flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold opacity-85 font-mono">
                  PART CODE: {modalPart.code}
                </div>
                <h2 className="text-lg font-bold mt-0.5">{modalPart.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setModalPart(null)}
                className="bg-white/20 hover:bg-white/30 text-white w-7 h-7 rounded-full text-base flex items-center justify-center transition"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <div className="flex justify-between items-center bg-[#e0f2fe] p-3 rounded-xl mb-3.5">
                <div>
                  <div className="text-[11px] text-[#475569] font-semibold">
                    Official Quotation Price (BDT)
                  </div>
                  <div className="text-xl font-extrabold text-[#0066cc]">
                    {modalPart.price}
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0066cc] bg-white px-2.5 py-1 rounded-full shadow-sm font-mono">
                  {modalPart.category}
                </span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                {modalPart.fullSpecs}
              </p>

              <div className="text-xs font-bold text-[#0f172a] mb-1.5">
                Compatible Models:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {MODELS.map((m) => (
                  <span
                    key={m.name}
                    className="bg-slate-100 text-[#0f172a] text-[11px] font-semibold px-2.5 py-0.5 rounded-md font-mono"
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Inquiry / Quote Order Form */}
              {quoteSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 mb-3">
                  <div className="text-emerald-700 font-bold text-sm">
                    Quotation Request Sent!
                  </div>
                  <p className="text-xs text-emerald-600">
                    Our sales engineers will contact you at {quoteForm.phone || 'your phone'} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0066cc]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / Mobile *"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0066cc]"
                    />
                    <input
                      type="text"
                      placeholder="Company / Bank"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0066cc]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={quoteSubmitting}
                    className="w-full py-2 px-4 rounded-lg bg-[#0066cc] hover:bg-[#0052a3] text-white text-xs font-bold transition shadow-sm"
                  >
                    {quoteSubmitting ? 'Submitting...' : 'Submit Official RFQ Order'}
                  </button>
                </form>
              )}

              <div className="mt-3.5 flex gap-2.5">
                <a
                  href="tel:01713093300"
                  className="bg-[#0066cc] hover:bg-[#0052a3] text-white text-xs font-semibold py-2 px-3 rounded-lg text-center flex-1 transition"
                >
                  Call 01713-093300 to Order
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setModalPart(null);
                    handleResetView();
                  }}
                  className="bg-white hover:bg-slate-50 text-[#0066cc] border border-[#0066cc] text-xs font-semibold py-2 px-3 rounded-lg transition"
                >
                  Back to Full Machine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
