<template>
  <div class="select">
    <div class="canvas-container">
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
    <div class="upload-container">
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileUpload"
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";

// 定义props接收父组件传入的图片数据
interface LogoItem {
  label: string;
  url: string;
}

interface Props {
  image?: LogoItem;
}

const props = withDefaults(defineProps<Props>(), {
  image: () => ({
    label: "ss",
    url: "https://s2.loli.net/2025/10/27/wQyMobUzEpaYBGn.png",
  }),
});

// 获取canvas画布
const canvas = ref<HTMLCanvasElement | null>(null);

// 文件输入引用
const fileInput = ref<HTMLInputElement | null>(null);

// 获取上下文
let context = ref<CanvasRenderingContext2D | null>(null);

/** canvas实体对象 */
let particleCanvas = ref<ParticleCanvas>();

// 设置画布大小
const width = 400,
  height = 600;

// 设置粒子动画时长
const animateTime = 30;
const opacityStep = 1 / animateTime;

/** 中心影响的半径 */
const Radius = 40;
/** 排斥/吸引 力度 */
const Inten = 0.95;

/** 粒子类 */
class Particle {
  x: number; // 粒子x轴的初始位置
  y: number; // 粒子y轴的初始位置
  totalX: number; // 粒子x轴的目标位置
  totalY: number; // 粒子y轴的目标位置
  mx?: number; // 粒子x轴需要移动的距离
  my?: number; // 粒子y轴需要移动的距离
  vx?: number; // 粒子x轴移动速度
  vy?: number; // 粒子y轴移动速度
  time: number; // 粒子移动耗时
  r: number; // 粒子的半径
  color: number[]; // 粒子的颜色
  opacity: number; // 粒子的透明度
  constructor(totalX: number, totalY: number, time: number, color: number[]) {
    // 设置粒子的初始位置x、y，目标位置dx、dy，总耗时time
    this.x = (Math.random() * width) >> 0;
    this.y = (Math.random() * height) >> 0;
    this.totalX = totalX;
    this.totalY = totalY;
    this.time = time;
    // 设置粒子的颜色和半径
    this.r = 1.2;
    this.color = [...color];
    this.opacity = 0;
  }
  // 在画布中绘制粒子
  draw() {
    context.value!.fillStyle = `rgba(${this.color.toString()})`;
    context.value!.fillRect(this.x, this.y, this.r * 2, this.r * 2);
    context.value!.fill();
  }
  /** 更新粒子
   * @param {number} mouseX 鼠标X位置
   * @param {number} mouseY 鼠标Y位置
   */
  update(mouseX?: number, mouseY?: number) {
    // 设置粒子需要移动的距离
    this.mx = this.totalX - this.x;
    this.my = this.totalY - this.y;
    // 设置粒子移动速度
    this.vx = this.mx / this.time;
    this.vy = this.my / this.time;
    // 计算粒子与鼠标的距离
    if (mouseX && mouseY) {
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let distance = Math.sqrt(dx ** 2 + dy ** 2);
      // 粒子相对鼠标距离的比例 判断受到的力度比例
      let disPercent = Radius / distance;
      // 设置阈值 避免粒子受到的斥力过大
      disPercent = disPercent > 7 ? 7 : disPercent;
      // 获得夹角值 正弦值 余弦值
      let angle = Math.atan2(dy, dx);
      let cos = Math.cos(angle);
      let sin = Math.sin(angle);
      // 将力度转换为速度 并重新计算vx vy
      let repX = cos * disPercent * -Inten;
      let repY = sin * disPercent * -Inten;
      this.vx += repX;
      this.vy += repY;
    }
    this.x += this.vx;
    this.y += this.vy;
    if (this.opacity < 1) this.opacity += opacityStep;
  }
  // 切换粒子
  change(x: number, y: number, color: number[]) {
    this.totalX = x;
    this.totalY = y;
    this.color = [...color];
  }
}

/** Logo图片类 */
class LogoImg {
  src: string;
  name: string;
  particleData: Particle[]; // 用于保存筛选后的粒子
  constructor(src: string, name: string) {
    this.src = src;
    this.name = name;
    this.particleData = [];
    let img = new Image();
    img.crossOrigin = "";
    img.src = src;
    // canvas 获取粒子位置数据
    img.onload = () => {
      // 获取图片像素数据
      const tmp_canvas = document.createElement("canvas"); // 创建一个空的canvas
      const tmp_ctx = tmp_canvas.getContext("2d");
      const imgW = width;
      const imgH = ~~(width * (img.height / img.width));
      tmp_canvas.width = imgW;
      tmp_canvas.height = imgH;
      tmp_ctx?.drawImage(img, 0, 0, imgW, imgH); // 将图片绘制到canvas中
      const imgData = tmp_ctx?.getImageData(0, 0, imgW, imgH).data; // 获取像素点数据
      tmp_ctx?.clearRect(0, 0, width, height);

      // 筛选像素点
      for (let y = 0; y < imgH; y += 5) {
        for (let x = 0; x < imgW; x += 5) {
          // 像素点的序号
          const index = (x + y * imgW) * 4;
          // 帅选条件为透明度
          const r = imgData![index]!;
          const g = imgData![index + 1]!;
          const b = imgData![index + 2]!;
          const a = imgData![index + 3]!;
          const sum = r + g + b + a;
          if (sum >= 100) {
            const particle = new Particle(x, y, animateTime, [r, g, b, a]);
            this.particleData.push(particle);
          }
        }
      }
    };
  }
}

// 画布类
class ParticleCanvas {
  canvasEle: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  ParticleArr: Particle[];
  mouseX?: number; // 鼠标X轴位置
  mouseY?: number; // 鼠标Y轴位置
  constructor(target: HTMLCanvasElement) {
    this.canvasEle = target;
    this.ctx = target.getContext("2d") as CanvasRenderingContext2D;
    this.width = target.width;
    this.height = target.height;
    this.ParticleArr = [];
    this.canvasEle.addEventListener("mousemove", (e) => {
      const { left, top } = this.canvasEle.getBoundingClientRect();
      const { clientX, clientY } = e;
      this.mouseX = clientX - left;
      this.mouseY = clientY - top;
    });
    this.canvasEle.onmouseleave = () => {
      this.mouseX = 0;
      this.mouseY = 0;
    };
  }
  // 改变图片 如果已存在图片则进行额外切换操作
  changeImg(img: LogoImg) {
    if (this.ParticleArr.length) {
      // 如果当前粒子数组大于新的粒子数组 删除多于的粒子
      let newPrtArr = img.particleData;
      let newLen = newPrtArr.length;
      let arr = this.ParticleArr;
      let oldLen = arr.length;

      // 调用change修改已存在粒子
      for (let idx = 0; idx < newLen; idx++) {
        const p = newPrtArr[idx];
        if (!p) continue;
        const { totalX, totalY, color } = p;
        if (arr[idx]) {
          // 找到已存在的粒子 调用change 接收新粒子的属性
          arr[idx]?.change(totalX, totalY, color);
        } else {
          arr[idx] = new Particle(totalX, totalY, animateTime, color);
        }
      }

      if (newLen < oldLen) this.ParticleArr = arr.splice(0, newLen);
      arr = this.ParticleArr;
      let tmp_len = arr.length;
      // 随机打乱粒子最终对应的位置 使切换效果更自然
      while (tmp_len) {
        // 随机的一个粒子 与 倒序的一个粒子
        let randomIdx = ~~(Math.random() * tmp_len--);
        let randomPrt = arr[randomIdx];
        //@ts-ignore
        let { totalX: tx, totalY: ty, color } = randomPrt;

        // 交换位置
        //@ts-ignore
        randomPrt.totalX = arr[tmp_len]?.totalX;
        //@ts-ignore
        randomPrt.totalY = arr[tmp_len]?.totalY;
        //@ts-ignore
        randomPrt.color = arr[tmp_len]?.color;
        //@ts-ignore
        arr[tmp_len].totalX = tx;
        //@ts-ignore
        arr[tmp_len].totalY = ty;
        //@ts-ignore
        arr[tmp_len].color = color;
      }
    } else {
      this.ParticleArr = img.particleData.map(
        (item) => new Particle(item.totalX, item.totalY, animateTime, item.color)
      );
    }
  }
  drawCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ParticleArr.forEach((particle) => {
      particle.update(this.mouseX, this.mouseY);
      particle.draw();
    });
    window.requestAnimationFrame(() => this.drawCanvas());
  }
}

// 显示图片
function showImage(prt_canvas: ParticleCanvas, logoItem: LogoImg) {
  prt_canvas.changeImg(logoItem);
}

// 处理文件上传
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      // 创建新的LogoImg对象
      const uploadedLogo = new LogoImg(imageUrl, `uploaded-${Date.now()}`);

      // 等待图片加载完成后显示
      const checkParticleData = () => {
        if (uploadedLogo.particleData.length > 0) {
          showImage(particleCanvas.value!, uploadedLogo);
        } else {
          setTimeout(checkParticleData, 100);
        }
      };

      setTimeout(checkParticleData, 100);
    };

    reader.readAsDataURL(file);
  }
}

// 监听父组件传入的图片数据变化
watch(
  () => props.image,
  (newImage) => {
    if (newImage && newImage.url) {
      const logoImg = new LogoImg(newImage.url, newImage.label);

      // 等待图片加载完成后显示
      const checkParticleData = () => {
        if (logoImg.particleData.length > 0) {
          showImage(particleCanvas.value!, logoImg);
        } else {
          setTimeout(checkParticleData, 100);
        }
      };

      setTimeout(checkParticleData, 100);
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (canvas.value) {
    context.value = canvas.value.getContext("2d");
    particleCanvas.value = new ParticleCanvas(canvas.value);
    particleCanvas.value.drawCanvas();
  }
});
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.canvas-container {
  margin-top: 15px;
  display: flex;
  height: 400px;
  canvas {
    margin: auto;
  }
}

.upload-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

#pointer {
  transform: translate3d(-50%, -50%, 0px);
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  transition-property: opacity, background-color, left, top, width, height;
  transition-duration: 0.3s, 0.3s, 0.1s, 0.1s, 0.3s, 0.3s;
  z-index: 2;
  pointer-events: none;
}
#pointer.hidden {
  opacity: 0;
}
#pointer.hover {
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.5);
}

#pointer-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  border: 4px solid #ccc;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0px) scale(1);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}
@keyframes effect {
  0% {
    transform: translate3d(-50%, -50%, 0px) scale(0.1);
    opacity: 1;
  }
  30% {
    opacity: 0.6;
  }
  100% {
    transform: translate3d(-50%, -50%, 0px) scale(1);
    opacity: 0;
  }
}
</style>
