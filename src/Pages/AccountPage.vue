<template>
<div>
    <div v-if="authUser !== null">
        <account-information :authUser="authUser"></account-information>
    </div>

</div>
</template>

<script>
import AccountInformation from "@/components/AccountInformation";
export default {
    name: "AccountPage",
    components: {
        AccountInformation
    },
    props: {
        authUser: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
