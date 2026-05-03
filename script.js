// Three.js 3D Bear Setup
let scene, camera, renderer, bear, bearGroup;
let bearRotation = 0;

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff5f7);
    scene.fog = new THREE.Fog(0xfff5f7, 100, 500);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 12, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff69b4, 1.2);
    pointLight.position.set(-8, 5, 8);
    scene.add(pointLight);

    const fillLight = new THREE.PointLight(0xffb6d9, 0.8);
    fillLight.position.set(0, -5, 10);
    scene.add(fillLight);

    // Create super cute 3D bear
    createSuperCute3DBear();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Mouse move effect
    document.addEventListener('mousemove', onMouseMove);

    // Start animation loop
    animate();
}

function createSuperCute3DBear() {
    bearGroup = new THREE.Group();

    // Materials
    const brownMaterial = new THREE.MeshStandardMaterial({
        color: 0xA0826D,
        roughness: 0.6,
        metalness: 0,
        flatShading: false
    });

    const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0xE8C8B8,
        roughness: 0.7,
        metalness: 0
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.5,
        metalness: 0
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.3
    });

    // BODY - Fat and cute
    const bodyGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const body = new THREE.Mesh(bodyGeometry, brownMaterial);
    body.scale.set(1.1, 1.4, 0.95);
    body.position.y = -0.2;
    body.castShadow = true;
    body.receiveShadow = true;
    bearGroup.add(body);

    // BELLY - Super cute
    const bellyGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const belly = new THREE.Mesh(bellyGeometry, innerMaterial);
    belly.scale.set(0.65, 0.85, 0.4);
    belly.position.set(0, -0.3, 0.85);
    belly.castShadow = true;
    belly.receiveShadow = true;
    bearGroup.add(belly);

    // HEAD - Big and round
    const headGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const head = new THREE.Mesh(headGeometry, brownMaterial);
    head.position.y = 1.8;
    head.scale.set(1.15, 1.2, 1);
    head.castShadow = true;
    head.receiveShadow = true;
    bearGroup.add(head);

    // SNOUT - Cute face area
    const snoutGeometry = new THREE.SphereGeometry(0.8, 64, 64);
    const snout = new THREE.Mesh(snoutGeometry, innerMaterial);
    snout.position.set(0, 1.4, 1.3);
    snout.scale.set(0.7, 0.8, 0.5);
    snout.castShadow = true;
    snout.receiveShadow = true;
    bearGroup.add(snout);

    // EARS - Big cute ears
    const earGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    
    const leftEar = new THREE.Mesh(earGeometry, brownMaterial);
    leftEar.position.set(-0.85, 2.8, 0.3);
    leftEar.scale.set(1, 1.1, 0.8);
    leftEar.castShadow = true;
    leftEar.receiveShadow = true;
    bearGroup.add(leftEar);

    // Inner left ear
    const innerLeftEar = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 32, 32),
        innerMaterial
    );
    innerLeftEar.position.set(-0.85, 2.8, 0.6);
    innerLeftEar.scale.set(0.6, 0.7, 0.5);
    bearGroup.add(innerLeftEar);

    const rightEar = new THREE.Mesh(earGeometry, brownMaterial);
    rightEar.position.set(0.85, 2.8, 0.3);
    rightEar.scale.set(1, 1.1, 0.8);
    rightEar.castShadow = true;
    rightEar.receiveShadow = true;
    bearGroup.add(rightEar);

    // Inner right ear
    const innerRightEar = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 32, 32),
        innerMaterial
    );
    innerRightEar.position.set(0.85, 2.8, 0.6);
    innerRightEar.scale.set(0.6, 0.7, 0.5);
    bearGroup.add(innerRightEar);

    // EYES - Big cute eyes
    const eyeGeometry = new THREE.SphereGeometry(0.22, 32, 32);
    
    const leftEye = new THREE.Mesh(eyeGeometry, whiteMaterial);
    leftEye.position.set(-0.5, 2.15, 1.45);
    leftEye.castShadow = true;
    bearGroup.add(leftEye);

    const leftPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 32, 32),
        blackMaterial
    );
    leftPupil.position.set(-0.48, 2.12, 1.58);
    bearGroup.add(leftPupil);

    const leftShine = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        whiteMaterial
    );
    leftShine.position.set(-0.42, 2.18, 1.62);
    bearGroup.add(leftShine);

    const rightEye = new THREE.Mesh(eyeGeometry, whiteMaterial);
    rightEye.position.set(0.5, 2.15, 1.45);
    rightEye.castShadow = true;
    bearGroup.add(rightEye);

    const rightPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 32, 32),
        blackMaterial
    );
    rightPupil.position.set(0.48, 2.12, 1.58);
    bearGroup.add(rightPupil);

    const rightShine = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        whiteMaterial
    );
    rightShine.position.set(0.42, 2.18, 1.62);
    bearGroup.add(rightShine);

    // NOSE - Cute button nose
    const noseGeometry = new THREE.SphereGeometry(0.18, 32, 32);
    const nose = new THREE.Mesh(noseGeometry, blackMaterial);
    nose.position.set(0, 1.5, 1.65);
    nose.castShadow = true;
    bearGroup.add(nose);

    // MOUTH - Cute smile
    const mouthGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const mouth = new THREE.Mesh(mouthGeometry, blackMaterial);
    mouth.position.set(0, 1.1, 1.6);
    mouth.scale.set(0.8, 0.6, 0.4);
    bearGroup.add(mouth);

    // ARMS - Chubby arms
    const armGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    
    const leftArm = new THREE.Mesh(armGeometry, brownMaterial);
    leftArm.position.set(-1.5, 0.5, 0);
    leftArm.scale.set(0.7, 1.3, 0.8);
    leftArm.rotation.z = 0.4;
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    bearGroup.add(leftArm);

    // Left paw
    const leftPaw = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        innerMaterial
    );
    leftPaw.position.set(-1.8, -0.3, 0.1);
    leftPaw.castShadow = true;
    bearGroup.add(leftPaw);

    const rightArm = new THREE.Mesh(armGeometry, brownMaterial);
    rightArm.position.set(1.5, 0.5, 0);
    rightArm.scale.set(0.7, 1.3, 0.8);
    rightArm.rotation.z = -0.4;
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    bearGroup.add(rightArm);

    // Right paw
    const rightPaw = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        innerMaterial
    );
    rightPaw.position.set(1.8, -0.3, 0.1);
    rightPaw.castShadow = true;
    bearGroup.add(rightPaw);

    // LEGS - Chubby legs
    const legGeometry = new THREE.SphereGeometry(0.55, 64, 64);
    
    const leftLeg = new THREE.Mesh(legGeometry, brownMaterial);
    leftLeg.position.set(-0.7, -1.6, 0.2);
    leftLeg.scale.set(0.8, 1, 0.9);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    bearGroup.add(leftLeg);

    // Left foot pads
    const leftFoot = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 32, 32),
        innerMaterial
    );
    leftFoot.position.set(-0.7, -2.2, 0.4);
    leftFoot.scale.set(1, 0.7, 1.1);
    leftFoot.castShadow = true;
    bearGroup.add(leftFoot);

    const rightLeg = new THREE.Mesh(legGeometry, brownMaterial);
    rightLeg.position.set(0.7, -1.6, 0.2);
    rightLeg.scale.set(0.8, 1, 0.9);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    bearGroup.add(rightLeg);

    // Right foot pads
    const rightFoot = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 32, 32),
        innerMaterial
    );
    rightFoot.position.set(0.7, -2.2, 0.4);
    rightFoot.scale.set(1, 0.7, 1.1);
    rightFoot.castShadow = true;
    bearGroup.add(rightFoot);

    // HEART on chest - Big and glowing
    const heartShape = new THREE.SphereGeometry(0.35, 32, 32);
    const heart = new THREE.Mesh(
        heartShape,
        new THREE.MeshStandardMaterial({
            color: 0xff69b4,
            emissive: 0xff1493,
            emissiveIntensity: 0.8,
            roughness: 0.3,
            metalness: 0.2
        })
    );
    heart.position.set(0, 0.3, 1.3);
    heart.castShadow = true;
    bearGroup.add(heart);

    // Heart glow
    const glowGeometry = new THREE.SphereGeometry(0.45, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff69b4,
        transparent: true,
        opacity: 0.3
    });
    const heartGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    heartGlow.position.set(0, 0.3, 1.3);
    bearGroup.add(heartGlow);

    // Add blush marks
    const blushGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const blushMaterial = new THREE.MeshStandardMaterial({
        color: 0xffb6d9,
        roughness: 0.8,
        transparent: true,
        opacity: 0.8
    });

    const leftBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    leftBlush.position.set(-0.8, 1.6, 1.3);
    leftBlush.scale.set(0.5, 0.4, 0.2);
    bearGroup.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    rightBlush.position.set(0.8, 1.6, 1.3);
    rightBlush.scale.set(0.5, 0.4, 0.2);
    bearGroup.add(rightBlush);

    scene.add(bearGroup);
    bear = bearGroup;
}

function animate() {
    requestAnimationFrame(animate);

    if (bear) {
        // Cute floating animation
        bear.position.y = Math.sin(Date.now() * 0.0008) * 0.4;
        bear.rotation.y = Math.sin(Date.now() * 0.0005) * 0.2;
        
        // Gentle scale pulse (breathing effect)
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.03;
        bear.scale.set(scale, scale, scale);

        // Sway animation
        bear.rotation.z = Math.sin(Date.now() * 0.0006) * 0.08;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function onMouseMove(event) {
    if (!bear) return;

    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    bear.rotation.x = y * 0.2;
    bear.rotation.z = (Math.sin(Date.now() * 0.0006) * 0.08) + x * 0.15;
}

// Get elements
const ahBtn = document.getElementById('ahBtn');
const laBtn = document.getElementById('laBtn');
const message = document.querySelector('.message');
const mainText = document.querySelector('.main-text');

let isGrowing = false;
let growthInterval = null;
let currentScale = 1;

// AH Button - Show message and create hearts
ahBtn.addEventListener('click', () => {
    if (growthInterval) {
        clearInterval(growthInterval);
        isGrowing = false;
        growthInterval = null;
    }

    currentScale = 1;
    ahBtn.style.transform = 'scale(1)';

    mainText.textContent = 'ta ana kenbghik a lhbila dyali ❤️';

    message.textContent = 'waxh mtéakda waxh mtéahda ghadi nskhaf';
    message.classList.add('show');

    if (bear) {
        bear.scale.set(1.15, 0.85, 1);
        setTimeout(() => {
            bear.scale.set(1, 1, 1);
        }, 200);
    }

    for (let i = 0; i < 15; i++) {
        createHeartParticle();
    }

    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);

    laBtn.disabled = true;
    laBtn.style.opacity = '0.5';
    laBtn.style.cursor = 'not-allowed';
    laBtn.removeEventListener('mouseenter', escapeButton);
    laBtn.removeEventListener('touchstart', escapeButton);
});

function createHeartParticle() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = '💕';

    const rect = ahBtn.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';

    const angle = (Math.random() * Math.PI * 2);
    const distance = 100 + Math.random() * 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    heart.style.setProperty('--x', x + 'px');
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
}

let isEscaping = false;

laBtn.addEventListener('mouseenter', escapeButton);
laBtn.addEventListener('touchstart', escapeButton);

function escapeButton(e) {
    if (isEscaping || laBtn.disabled) return;
    isEscaping = true;

    message.textContent = 'wax mt2akda';
    message.classList.add('show');

    startAhGrowth();

    const randomX = Math.random() * (window.innerWidth - laBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - laBtn.offsetHeight);

    laBtn.style.position = 'fixed';
    laBtn.style.left = randomX + 'px';
    laBtn.style.top = randomY + 'px';
    laBtn.style.transition = 'all 0.3s ease';
    laBtn.style.zIndex = '1000';

    setTimeout(() => {
        message.textContent = 'wax mt2akda ghadi nskhaf';
    }, 1500);

    setTimeout(() => {
        isEscaping = false;
    }, 400);

    setTimeout(() => {
        laBtn.style.position = 'relative';
        laBtn.style.left = 'auto';
        laBtn.style.top = 'auto';
        laBtn.style.zIndex = 'auto';
        message.classList.remove('show');
    }, 3000);
}

function startAhGrowth() {
    if (isGrowing) return;
    isGrowing = true;
    currentScale = 1;

    growthInterval = setInterval(() => {
        currentScale += 0.08;
        ahBtn.style.transform = `scale(${currentScale})`;
        ahBtn.style.boxShadow = `0 8px 30px rgba(255, 105, 180, ${0.4 + currentScale * 0.2})`;
    }, 100);
}

window.addEventListener('load', initThreeJS);
