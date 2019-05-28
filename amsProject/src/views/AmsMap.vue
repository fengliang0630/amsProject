<template>
    <div id="map-root-div">
        <div id="map-filter-div"></div>

        <div id="map-containt-div"></div>
    </div>
</template>

<script>

    import { getPoints } from '../api/api';

    export default {
		data() {
			return {
				map: {}
			}
		},
		methods: {
            init() {
                this.map = new BMap.Map("map-containt-div");
                this.map.centerAndZoom(new BMap.Point(116.53334519970919,40.035193753587585), 15);
                this.map.enableScrollWheelZoom();
                // this.map.setMapType(BMAP_HYBRID_MAP);//卫星&路网
            },
            drowBlock() {
                getPoints().then(resp => {
                    var points = resp.points;

                    for(var i = 0;i < points.length; i++){
                        var ps = points[i];
                        var psT = [];

                        for(var j = 0; j < ps.length; j++){
                            var mp = new BMap.Point(ps[j].x, ps[j].y);
                            mp.lat = mp.lat + 0.0070;
                            mp.lng = mp.lng + 0.0064;
                            psT.push(mp);
                        }
                        
                        this.map.addOverlay(new BMap.Polyline(psT, {
                            strokeColor : "red",  
                            strokeWeight : 3,  
                            strokeOpacity : 0.5  
                        })); // 画线 
                    }
                });
            }
        },
        mounted() {
            this.init();
            this.drowBlock();
        },
	}
</script>

<style scoped lang="scss">
    #map-containt-div {
        width: 100%;
        height: 800px;
    }
</style>