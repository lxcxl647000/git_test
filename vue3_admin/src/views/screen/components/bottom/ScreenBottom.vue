<template>
    <div class="bottom">
        <div class="left">
            <ScreenVisitor></ScreenVisitor>
            <ScreenSex class="sex"></ScreenSex>
            <ScreenAge class="age"></ScreenAge>
        </div>
        <div class="center">
            <ScreenMap class="map"></ScreenMap>
            <ScreenVisitorTrend class="trend"></ScreenVisitorTrend>
        </div>
        <div class="right">
            <ScreenScenicSpotRank></ScreenScenicSpotRank>
            <ScreenVisitorCompared class="compared"></ScreenVisitorCompared>
            <ScreenReservation class="reservation"></ScreenReservation>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ScreenVisitor from './left/ScreenVisitor.vue';
    import ScreenSex from './left/ScreenSex.vue';
    import ScreenAge from './left/ScreenAge.vue';
    import ScreenScenicSpotRank from './right/ScreenScenicSpotRank.vue';
    import ScreenVisitorCompared from './right/ScreenVisitorCompared.vue';
    import ScreenReservation from './right/ScreenReservation.vue';
    import ScreenMap from './center/ScreenMap.vue';
    import ScreenVisitorTrend from './center/ScreenVisitorTrend.vue';


</script>

<style scoped lang="scss">
    .bottom {
        display: flex;

        .left {
            flex: 1;
            margin-left: 55px;
            display: flex;
            flex-direction: column;

            .sex {
                margin-top: 30px;
            }

            .age {
                margin-top: 30px;
            }
        }

        .center {
            flex: 2;
            display: flex;
            flex-direction: column;

            .map {
                flex: 3;
            }

            .trend {
                margin-left: -50px;
            }
        }

        .right {
            flex: 1;

            .compared {
                margin-top: 30px;
            }

            .reservation {
                margin-top: 30px;
            }
        }
    }
</style>