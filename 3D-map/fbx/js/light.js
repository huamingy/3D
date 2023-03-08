import * as THREE from '../../build/three.module.js'

    const scene = new THREE.Scene()
       // 点光源（PointLight）表示的是从一个点朝各个方向发射出光线的一种光照效果
       const point = new THREE.PointLight(0x444444,0.5)
       point.position.set(100, 8000, 100); //点光源位置
       // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
       scene.add(point) //点光源添加到场景中
       // const point1 = new THREE.PointLight(0xffffff);//点光源
       // point1.position.set(100, 300, 600); //点光源位置
       // scene.add(point1); //点光源添加到场景中
 
       // 半球光（HemisphereLight）的颜色是从天空到地面两个颜色之间的渐变，与物体材质的颜色作叠加后得到最终的颜色效果
       const hemiLight = new THREE.HemisphereLight(0xf8f8ff, 0x444444)
       hemiLight.position.set( 4000, 8000, 0 );
       scene.add(hemiLight)
 
       // 方向光，常常用来表现太阳光照的效果
       const dirLight = new THREE.DirectionalLight(0xf8f8ff)
       dirLight.position.set( 3000, 5000, 1000 );
       dirLight.castShadow = true
       dirLight.shadow.camera.top = 180
       dirLight.shadow.camera.bottom = -100
       dirLight.shadow.camera.left = -120
       dirLight.shadow.camera.right = 120
       scene.add(dirLight)


       var camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
      camera.position.set(400, 1200, 0) //镜头XYZ位置
      // camera.up.set(1, 0, 1);//镜头面向朝向

      scene.background = new THREE.Color(0x000000)

      
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      renderer.autoClear = false
      renderer.gammaInput = true
      renderer.gammaOutput = true //inear转gamma
      document.body.appendChild(renderer.domElement)

       export {scene,camera,renderer}

