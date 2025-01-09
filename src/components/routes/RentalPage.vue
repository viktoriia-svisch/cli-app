<template>
    <div class="main-container">
        <div class="info-text rental-panel">
            <h1 class="title title--mt-0">Vous souhaitez louer du matériel auprès de zest radio ?</h1>
            <p>
                Nous disposons de :
            </p>
            <div class="equipment">
                <div class="equipment-element">
                    <label for="xdj"><b>4 x</b><br />XDJ 1000 mk2</label>
                    <img width="100%" src="../../assets/imgs/rentals/xdj.jpg" id="xdj" />
                </div>
                <div class="equipment-element">
                    <label for="djm"><b>1 x</b><br />DJM 750 mk2</label>
                    <img width="100%" src="../../assets/imgs/rentals/djm.jpg" id="djm" />
                </div>
                <div class="equipment-element">
                    <label for="xone"><b>1 x</b><br />XONE:PX5</label>
                    <img width="100%" src="../../assets/imgs/rentals/xone.jpg" id="xone" />
                </div>
                <div class="equipment-element">
                    <label for="technics"><b>2 x</b><br />Technics SL1200 mk2</label>
                    <img width="100%" src="../../assets/imgs/rentals/technics.jpg" id="technics" />
                </div>
            </div>
        </div>
        <iframe class="form-wrapper rental-panel"
            src="https:            width="calc(100% + 2rem)" height="calc(100% + 2rem)" frameborder="0" marginheight="0"
            marginwidth="0">Chargement…</iframe>
    </div>
</template>
<script>
export default {
    name: "RentalPage",
};
</script>
<style lang="less" scoped>
.main-container {
    display: flex;
    margin: -2rem;
    overflow: hidden;
    height: calc(100% + 4rem);
    @media (max-width: 815px) {
        margin-bottom: -6rem;
        height: calc(100% + 8rem);
        width: calc(100% + 3rem);
    }
}
.form-wrapper {
    flex-grow: 1;
}
.info-text {
    overflow: auto;
    padding: 2rem;
    box-sizing: border-box;
    flex-grow: 1;
    @media (max-width: 815px) {
        display: none;
    }
}
.rental-panel {
    width: 50%;
    height: 100%;
    @media (max-width: 815px) {
        width: 100%;
    }
}
.equipment {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
}
.equipment-element {
    width: calc(50% - .5rem);
    max-width: 200px;
    flex-shrink: 1;
}
</style>
