<template>
    <ul>
        <li><b>Count:</b> {{item.count }}</li>
        <li><b>Total RSV:</b> {{item.rsv_sum }} <small> ( {{ format_rsv(item.rsv_min) }} - {{ format_rsv(item.rsv_max) }} , mean: {{ format_rsv(item.rsv_mean) }} )</small></li>
        <li><b>Total Score:</b> {{ format_score(item.score_sum) }} <small> ( {{ format_score(item.score_min) }} - {{ format_score(item.score_max) }} , mean: {{ format_score(item.score_mean) }} )</small></li>
        <li><b>Adjective count:</b> {{ item.adjective_count }} <small> ( {{ format_prc(item.adjetive_proportion) }} )</small></li>
    </ul>
</template>
<script>
import NumberHelper from "@/reluihelpers/mixin/NumberHelper"

export default {
    props: ['item'],
    methods: {
        format_prc(n){
            return NumberHelper.format_prc(n);
        },
        format_rsv(n){
            return NumberHelper.format(n, 0);
        }, 
        format_score(n){
            return NumberHelper.format(n, 5);
        }
    },
}
</script>