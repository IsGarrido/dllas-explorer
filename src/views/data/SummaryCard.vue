<template>
    <ul>
        <li><b>Count:</b> {{item.count }}</li>
        <li><b>Total RSV:</b> {{item.rsv_sum }} <small> ( {{ format_rsv(item.rsv_min) }} - {{ format_rsv(item.rsv_max) }} , mean: {{ format_rsv(item.rsv_mean) }} )</small></li>
        <li><b>Total Score:</b> {{ format_score(item.score_sum) }} <small> ( {{ format_score(item.score_min) }} - {{ format_score(item.score_max) }} , mean: {{ format_score(item.score_mean) }} )</small></li>
        <li><b>Adjective count:</b> {{ item.adj_cnt }} <small> ( {{ format_prc(item.adj_prop) }} )</small></li>
        <li><b>Sentiment:</b>  
            <span style="margin-left: 5px">
                <span style="color:green">{{ item.snt_pos_cnt }}</span> / 
                <span style="color:red">{{ item.snt_neg_cnt }}</span> / 
                <span style="color:blue">{{ item.snt_neu_cnt }}</span>
            </span>
        </li>
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