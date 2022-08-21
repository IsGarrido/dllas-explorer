<template>
    <b-table striped hover :items="rows" :fields="fields" v-if="loaded"></b-table>
</template>

<script>
export default {
    props: ['items', 'remove_cols', 'transforms', 'shadow_rows', 'sort_by', 'sort_by_desc'],
    created() {
        let copy = JSON.parse(JSON.stringify(this.items));

        if (this.transforms) {
            Object.keys(this.transforms).forEach(col => {
                let transformFn = this.transforms[col];
                copy.forEach(item => {
                    item[col] = transformFn(item[col], col);
                });
            });
        }

        if (this.shadow_rows) {
            Object.keys(this.shadow_rows).forEach(col => {
                let checkFn = this.shadow_rows[col];
                copy.forEach(item => {
                    if (checkFn(item[col], col)) {
                        item["_rowVariant"] = 'shadow';
                    }
                });

            });
        }

        let remove_cols = this.remove_cols ?? [];

        remove_cols.forEach(col => {
            copy.forEach(item => {
                delete item[col];
            });
        });


        this.rows = copy;
        // if(this.sort_by) this.rows.sort( (a,b) => a[this.sort_by] < b[this.sort_by] ? -1 : 1)
        // if(this.sort_by_desc) this.rows.sort( (a,b) => a[this.sort_by] > b[this.sort_by] ? -1 : -1)
        
        this.fields = Object.keys(this.rows[0]).filter(x => x[0] != '_').map(field => {
            return {
                key: field,
                label: field.split("_").join(" "),
                sortable: true
            }
        });
        this.loaded = true;
    },
    data() {
        return {
            loaded: false,
            rows: [],
            fields: []
        }
    }
}
</script>
<style>
.table-shadow {
    text-decoration: line-through;
}
</style>