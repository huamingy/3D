import * as THREE from '../../build/three.module.js'
import {scene, renderer,camera } from './light.js'
import {  addlabel  ,AClabel,labelRenderer } from './tempeture.js'
      import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
      import {
        CSS2DObject,
      } from '../jsm/renderers/CSS2DRenderer.js'
      import {
        CSS3DRenderer,
      } from '../jsm/renderers/CSS3DRenderer.js'
      const params = {
        twoFEquipment: false,
        enableFoor2: true,
        enableDevie: true,
      }
   

      var granaryArr = []
      var Arr = []
      var label = null
      var css3dlabel = null

      var loader = new GLTFLoader()
      loader.load(
        '../models/NanJingNanBuilding/NanJingNanBuilding_1F.gltf',
        function (obj) {
          obj.scene.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })
        
       
            
          scene.add(obj.scene)
        
          obj.scene.position.z =-1300
          obj.scene.position.x =+1700
          obj.scene.position.y =100
          addlabel();
          var Arr = scene.getObjectByName('1F_DTP')
          // console.log('Arr: ', Arr)
          Arr.children.forEach(function (mesh) {
            if (mesh.isMesh) {
              granaryArr.push(mesh)
            }
          })
        }
      )
//
      var tag = document.getElementById('label')
      label = new CSS2DObject(tag)
      tag.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
      scene.add(label)


      function showlabel(mesh) {
        label.element.style.visibility = 'visible'
      }
      var chooseMesh = null

      function choose(event) {
        if (chooseMesh) {
          AClabel.element.style.visibility = 'hidden' //显示标签
          // label.element.style.visibility = 'hidden';
        }

        var Sx = event.clientX //鼠标单击位置横坐标
        var Sy = event.clientY //鼠标单击位置纵坐标
        //屏幕坐标转WebGL标准设备坐标
        var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设备横坐标
        var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
        //创建一个射线投射器`Raycaster`
        var raycaster = new THREE.Raycaster()
        //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
        //返回.intersectObjects()参数中射线选中的网格模型对象
        // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
        var intersects = raycaster.intersectObjects(granaryArr)
        //console.log("射线投射器返回的对象 点point", intersects[0].point);
        //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
        //   intersects.length大于0说明，说明选中了模型
        if (intersects.length > 0) {
          chooseMesh = intersects[0].object
          //chooseMesh.material.color.set(0x000000);//选中改变颜色，这样材质颜色贴图.map和color颜色会相乘
          AClabel.element.style.visibility = 'visible' //显示标签
          AClabel.position.copy(chooseMesh.getWorldPosition())
          AClabel.position.z =chooseMesh.getWorldPosition().z-130;
          AClabel.position.y =50;
          var AClabelname = document.getElementById('AClabelname')
          if(chooseMesh.name=='1F_USP01'){  
            AClabelname.innerHTML="UPS1"
            changeURL('11')
          }else if(chooseMesh.name=="1F_USP02"){
            AClabelname.innerHTML="UPS2"
            changeURL('111')
          }else if(chooseMesh.name=="1F_Air-Conditioning01"){
            AClabelname.innerHTML="1#世图兹空调"
            changeURL('61')
          }else if(chooseMesh.name=="1F_Air-Conditioning02"){
            AClabelname.innerHTML="2#佳力图空调"
            changeURL('62')
          }
        }
      }

      addEventListener('click', choose) // 监听窗口鼠标单击事件,鼠标单击选中某个国家Mesh

      //坐标系
      // var axesHelper = new THREE.AxesHelper(300)

      // scene.add(axesHelper)

  

      

      function addline(findmesh) {
        var edges = new THREE.EdgesGeometry(findmesh.geometry, 1)
        var edgesMaterial = new THREE.LineBasicMaterial({
          color: 0x31deef,
        })
        var line = new THREE.LineSegments(edges, edgesMaterial)
        line.name = 'line'
        findmesh.add(line)
      }
      function deleline(findmesh) {
        var line1 = scene.getObjectByName('line')

        findmesh.remove(line1)
      }
      // 使外部透明化，以便于观看
      function showopty() {
        var a = scene.getObjectByName('2F_JG')

        a.children.forEach(function (mesh) {
       

          mesh.material.transparent = true
          mesh.material.opacity = 0.1
        })
      }













      function render() {
        // console.log(camera.position);
    
        renderer.render(scene, camera) //执行渲染操作
         labelRenderer.render(scene, camera) //CSS3D渲染
        
        // composer1.render()
        requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
   
      
      
       
      }
      render()


      var message,URlSE;
      var URl = "http://192.168.108.130:9090/njdt_yw_server/3d-view/get-wsd?type=2"
      var URlTEST ="http://192.168.108.130:9090/njdt_yw_server/3d-view/get-device-info?deviceNo=S0E11&type=2"
      
      $.ajax({
        type:'post',
            url: URl,
            data:message,
            dataType : 'json',
            async : false, //默认为true 异步
            success:function(data){
               
              message=data;
              
            },
           
        });
        // console.log('message: ', message);
        $().ready(function(){
      
      
      
      $("#Tvalue1").text(message.data[0].data)
      
      $("#Hvalue1").text(message.data[1].data)
      
      $("#Tvalue2").text(message.data[2].data)
      
      $("#Hvalue2").text(message.data[3].data)
      $("#Tvalue3").text(message.data[4].data)
      
      $("#Hvalue3").text(message.data[5].data)
      $("#Tvalue4").text(message.data[6].data)
      
      $("#Hvalue4").text(message.data[7].data)
      
        })


        var SE031msg
        $.extend({
        'chURL':function(num){
         var m = URlTEST.slice(-2);
        //  console.log('j: ', m);
           URlSE= URlTEST.replace(/11/,num)
        //  console.log(' URl031.slice(-2).replace(num): ',  URlSE);
        },
       
       })

       function changeURL(num){
         $.chURL(num)   
       $.ajax({
         type:'post',
             url: URlSE,
             data:SE031msg,
             dataType : 'json',
             async : false, 
             success:function(data){
                
               SE031msg=data;
              //  console.log('SE031msg: ', SE031msg);
 
             },
            
         });
         //清空之前添加的数据
         $("#nr").html('')
         SE031msg.data.sort().reverse();
         $.each(SE031msg.data,function(iteam,index){
          if(index.latestValue == 0){

          }else{
           
          if(iteam%2==0){
        
            $("#nr").prepend(
            '<div class="TH_tagname_out">'+'<div class="TH_tagname" >'+index.tagName+
            '</div><div  class="TH_name_value">'+index.latestValue+'</div></div>')
            
          }else if(iteam%2==1){
            
            
            $("#nr").prepend(
            '<div  class="TH_name_out2">'+
              '<div class="TH_tagname"  >'+index.tagName+'</div>'+
              '<div  class="TH_name_value">'+index.latestValue+'</div></div>')
          }
        }
        })
      

        }


