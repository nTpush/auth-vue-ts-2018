<template>
    <div class="hello" id="info">


    </div>
</template>


<script lang="ts">
    import * as THREE from 'three'
    import TrackballControls from 'three-trackballcontrols'
    import OBJLoader from 'three-obj-loader';
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import myaddress from '@/components/address.js'
    OBJLoader(THREE)

    @Component
    export default class App extends Vue {
        // 初始化数据
        mouseX = 0
        mouseY = 0;
        camera= null
        scene= null
        renderer= null
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        mesh=null
        controls=null
        // 声明周期钩子
        mounted () {
            this.init();
            this.animate()
            this.onWindowResize()
        }
        init() {
            var container = document.getElementById('info');

            this.camera = new THREE.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 1, 5000);
            this.camera['position'].x = 30
            this.camera['position'].y = -300
            this.camera['position'].z = 0
            this.scene = new THREE.Scene();
            this.scene.add(this.camera)

            let ambientLight = new THREE.AmbientLight(0x202020);
            this.camera.add(ambientLight);

            let directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
            directionalLight['position'].x = 1;
            directionalLight['position'].y = 1;
            directionalLight['position'].z = 2;
            directionalLight['position'].normalize();
            this.camera.add(directionalLight);


            var pointLight = new THREE.PointLight(0xffffff, 0.3);
            pointLight['position'].x = 0;
            pointLight['position'].y = -25;
            pointLight['position'].z = 10;
            this.camera.add(pointLight);


            this.controls = new TrackballControls( this.camera );
            this.controls.rotateSpeed = 5.0;
            this.controls.zoomSpeed = 5;
            this.controls.panSpeed = 2;
            this.controls.staticMoving = true;
            this.controls.dynamicDampingFactor = 0.3;
//            this.controls.addEventListener( 'change', this.render );     // 需要隐藏会报错
//            controls.target.set( 0, 1.2, 2 );
            this.controls.update();


            let manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
            };

            var onProgress = function ( xhr ) {
                if ( xhr.lengthComputable ) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
//                    console.log( Math.round(percentComplete, 2) + '% downloaded' );
                }
            };
            var onError = function ( xhr ) {
            };

//            OBJLoader(Three);

            const loader = new THREE['OBJLoader']()
            loader.load( 'static/data/1.obj', ( object ) => {
                var material = new THREE.MeshPhongMaterial({ color: 0xff5533,specular :0x333333,transparent:true,opacity:0.5,depthWrite:false});
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material = material;
                        child.material.side = THREE.FrontSide;
                    }
                } );
                this.scene.add( object );
            }, onProgress, onError );




            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( this.renderer.domElement );
            document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
            //
            window.addEventListener( 'resize', this.onWindowResize, false );

        }
        onWindowResize() {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        }
        onDocumentMouseMove( event ) {
            this.mouseX = ( event.clientX - this.windowHalfX ) / 2;
            this.mouseY = ( event.clientY - this.windowHalfY ) / 2;
        }

        animate() {


            requestAnimationFrame( this.animate );
            this.controls.update();

            this.renderer.render(this.scene, this.camera);

        }
        render() {
            this.renderer.render(this.scene, this.camera);
        }

        //


    }
</script>
<style>
    body {
        font-family: Monospace;
        background-color: #000;
        color: #fff;
        margin: 0px;
        overflow: hidden;
    }
    #info {
        color: #fff;
        position: absolute;
        top: 10px;
        width: 100%;
        text-align: center;
        z-index: 100;
        display:block;
    }
    #info a, .button { color: #f00; font-weight: bold; text-decoration: underline; cursor: pointer }
</style>
