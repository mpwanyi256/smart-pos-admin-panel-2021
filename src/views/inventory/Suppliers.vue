<template>
    <div class="suppliers">
        <Table>
            <template slot="header">
                <tr>
                    <th><BaseTextfield placeholder="Find a supplier" /></th>
                    <th>Contact</th>
                    <th>Added by</th>
                    <th>&nbsp;</th>
                </tr>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'Suppliers',
  components: {
    Table,
    BaseTextfield,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .suppliers {
        height: calc(100vh - 62px);
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        color: $black;
    }

</style>
