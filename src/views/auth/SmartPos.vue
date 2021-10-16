<template>
    <div class="smart">
        <div class="cover_area">
            <AuthCard />
        </div>
    </div>
</template>
<script>
import AuthCard from '@/views/auth/AuthCard.vue';

export default {
  name: 'SmartPos',
  components: {
    AuthCard,
  },
};
</script>

<style scoped lang="scss">
@import '../../styles/constants.scss';

.smart {
    height: 100vh;
    width: 100vw;
    background-image: url('../../assets/rocket.jpeg');
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;

    .cover_area {
        color: $white;
        width: 600px;
        height: auto;
    }
}
</style>
