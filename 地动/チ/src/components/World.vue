<template>
  <div ref="container" class="earth-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 导入地球贴图
import earthTextureUrl from '../assets/earth (2).jpg'

// 响应式引用
const container = ref(null)
let renderer, camera, scene, controls, earth, clouds
let animateId = null
const radius = 10 // 地球半径

// 经纬度转三维坐标（如果需要）
const lglt2xyz = (lng, lat, r = radius) => {
  const phi = (180 + lng) * (Math.PI / 180)
  const theta = (90 - lat) * (Math.PI / 180)
  return {
    x: -r * Math.sin(theta) * Math.cos(phi),
    y: r * Math.cos(theta),
    z: r * Math.sin(theta) * Math.sin(phi)
  }
}

// 初始化渲染器
const initRenderer = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)
}

// 初始化相机
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 50) // 调整相机位置
  camera.lookAt(0, 0, 0)
}

// 初始化场景
const initScene = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x020924) // 深蓝色背景
}

// 初始化控制器
const initControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.5
  controls.enableZoom = true
  controls.autoRotate = true // 自动旋转
  controls.autoRotateSpeed = 0.5
}

// 创建星空背景
const createStars = () => {
  const positions = []
  const colors = []
  const geometry = new THREE.BufferGeometry()

  for (let i = 0; i < 5000; i++) { // 减少星星数量以提升性能
    // 随机生成坐标（球形分布）
    const vertex = new THREE.Vector3()
    vertex.x = (Math.random() - 0.5) * 2
    vertex.y = (Math.random() - 0.5) * 2
    vertex.z = (Math.random() - 0.5) * 2
    vertex.normalize()
    vertex.multiplyScalar(Math.random() * 100 + 50) // 星星在50-150单位距离内
    
    positions.push(vertex.x, vertex.y, vertex.z)

    // 随机生成颜色
    const color = new THREE.Color()
    // 生成白色到淡蓝色的星星
    color.setHSL(0.6, 0.3, Math.random() * 0.5 + 0.5)
    colors.push(color.r, color.g, color.b)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  // 创建粒子材质
  const starMaterial = new THREE.PointsMaterial({
    size: 0.7,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })

  // 创建粒子系统
  const stars = new THREE.Points(geometry, starMaterial)
  scene.add(stars)
}

// 创建带贴图的地球
const createEarthWithTexture = () => {
  const geometry = new THREE.SphereGeometry(radius, 64, 64)
  
  // 使用导入的贴图
  const textureLoader = new THREE.TextureLoader()
  
  // 加载贴图
  textureLoader.load(earthTextureUrl, (texture) => {
    console.log('地球贴图加载成功')
    
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.2,
      emissive: 0x0a1e3a,
      emissiveIntensity: 0.1
    })
    
    earth = new THREE.Mesh(geometry, earthMaterial)
    scene.add(earth)
    
    // 创建云层效果
    // createClouds()
  }, undefined, (error) => {
    console.error('地球贴图加载失败:', error)
  })
}

// 创建云层效果
const createClouds = () => {
  // 创建一个稍大的球体作为云层
  const cloudGeometry = new THREE.SphereGeometry(radius * 1.02, 64, 64)
  
  // 创建云层材质（半透明）
  const cloudMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
    depthWrite: false // 避免云层和地球表面深度冲突
  })
  
  clouds = new THREE.Mesh(cloudGeometry, cloudMaterial)
  scene.add(clouds)
}

// 初始化灯光
const initLight = () => {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  scene.add(ambientLight)
  
  // 主光源（模拟太阳）
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2)
  mainLight.position.set(50, 50, 50)
  mainLight.castShadow = false
  scene.add(mainLight)
  
  // 补光
  const fillLight = new THREE.DirectionalLight(0x88ccff, 0.3)
  fillLight.position.set(-30, -20, -30)
  scene.add(fillLight)
  
  // 背光
  const backLight = new THREE.DirectionalLight(0xff8844, 0.2)
  backLight.position.set(-20, 10, -40)
  scene.add(backLight)
}
// 渲染函数
const render = () => {
  if (controls) controls.update()
  
  // 让地球缓慢自转
  if (earth) {
    earth.rotation.y += 0.001
  }
  
  // 让云层以不同的速度旋转（模拟大气流动）
  if (clouds) {
    clouds.rotation.y += 0.0005
  }
  
  renderer.render(scene, camera)
}

// 动画循环
const animate = () => {
  animateId = requestAnimationFrame(animate)
  render()
}

// 窗口大小调整
const onWindowResize = () => {
  if (!camera || !renderer) return
  
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

// 组件挂载时初始化
onMounted(() => {
  if (!container.value) return
  
  initRenderer()
  initCamera()
  initScene()
  initLight()
  initControls()
  createStars()
  
  // 使用贴图创建地球
  createEarthWithTexture()
  
  animate()
  window.addEventListener('resize', onWindowResize)
})

// 组件卸载时清理
onUnmounted(() => {
  if (animateId) cancelAnimationFrame(animateId)
  window.removeEventListener('resize', onWindowResize)
  
  if (renderer) {
    renderer.dispose()
  }
  
  // 清理场景
  if (scene) {
    while(scene.children.length > 0) { 
      const child = scene.children[0]
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose())
        } else {
          child.material.dispose()
        }
      }
      scene.remove(child) 
    }
  }
})
</script>

<style scoped>
.earth-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #020924 0%, #041c4d 50%, #020924 100%);
}

/* 加载动画（可选） */
.earth-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 10;
  opacity: 0;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 移除加载动画 */
.earth-container.loaded::before {
  display: none;
}
</style>