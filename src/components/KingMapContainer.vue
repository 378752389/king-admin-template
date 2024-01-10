<script setup>
import {onMounted, onUnmounted, reactive} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import {ElMessage} from "element-plus";

let map = null;

const location = reactive({
  longitude: 114.027311,
  latitude: 22.610719
})
const registerScale = (loader, map) => {
  const scale = new loader.Scale({
    visible: true
  })

  // 注册尺标插件
  map.addControl(scale)

  return scale
}

const registerToolBar = (loader, map) => {
  const toolBar = new loader.ToolBar()
  map.addControl(toolBar)
  return toolBar
}

const registerLocation = (loader, map) => {
  // 实例化定位插件
  const geolocation = new loader.Geolocation({
    showCircle: false, // 关闭定位圆圈，默认是打开的
    enableHighAccuracy: true, // 是否使用高精度定位，默认：true
    timeout: 10000, // 设置定位超时时间，默认：无穷大
    offset: [10, 20],  // 定位按钮的停靠位置的偏移量
    zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    position: 'LB', //  定位按钮的排放位置,  RB表示右下
  })

  // 监听定位信息，并重新 标记
  // zoom: 10  => 10公里  zoom: 11 => 5公里    zoom: 14 => 1公里
  geolocation.on('complete', function (result) {
    map.setCenter(result.position);
    map.setZoom(14)
  });

  // 注册定位插件
  map.addControl(geolocation)

  return geolocation
}
const registerDefaultMarker = (loader, map, name, lon, lat) => {
  let marker = new loader.Marker({
    // 可以自定义一些属性， 并在事件 e.target._opt 中获取一些自定义属性
    id: 1,
    name: '马克1',
    position: new loader.LngLat(lon, lat), //经纬度对象
  });

  marker.on("click", (e) => {
    // const name = e._opts.name
    // const lng = e.lnglat.lng
    // const lat = e.lnglat.lat
    console.log(e)
    ElMessage.success(`点击了 ${e.target._opts.name}`)
  })

  map.add(marker)
}

onMounted(async () => {

  // 加载插件对象
  const loader = await AMapLoader.load({
    key: "10e801235ead8e2381e5b665ed95f9b0", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.Geolocation', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })

  // 地图初始化参数可以获取城市级别的定位
  map = new loader.Map("container", {
    // 设置地图容器id
    viewMode: "2D", // 是否为3D地图模式
    zoom: 5, // 初始化地图级别
    // center: [116.397428, 39.90923], // 初始化地图中心点位置
    center: [location.longitude, location.latitude]
  });


  // 注册游标插件
  registerScale(loader, map)
  // 注册定位插件
  // const geolocation = registerLocation(loader, map)
  registerLocation(loader, map)
  // 注册缩放插件
  registerToolBar(loader, map)
  registerDefaultMarker(loader, map, "马克", 113, 22)


  // 通过定位插件获取当前经纬度
  // geolocation.getCurrentPosition(function (status, result) {
  //   if (status == 'complete') {
  //     // data是具体的定位信息
  //     if (result.info === 'SUCCESS') {
  //       ElMessage.success(result.message)
  //
  //       const accuracy = result.accuracy
  //       const lat = result.position.lat
  //       const lon = result.position.lng
  //
  //       console.log(`精度：${accuracy}, 经度：${lon}, 纬度：${lat}`)
  //       ElMessage.warning(`精度：${accuracy}, 经度：${lon}, 纬度：${lat}`)
  //
  //       location.longitude = lat
  //       location.latitude = lon
  //     }
  //   } else {
  //     // 定位出错
  //     console.log("定位出错", result)
  //   }
  // });
})


onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>

#container {
  height: 900px;
}
</style>