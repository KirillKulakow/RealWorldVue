<template>
    <div class="loader">
        <svg v-if="sizeLoader === 'small'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="13" width="4" height="5" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="5;21;5" 
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="13; 5; 13"
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="10" y="13" width="4" height="5" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="5;21;5" 
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="13; 5; 13"
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="20" y="13" width="4" height="5" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="5;21;5" 
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="13; 5; 13"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>
        <svg v-else-if="sizeLoader === 'middle'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="36px" height="45px" viewBox="0 0 36 45" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="19" width="6" height="8" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="8;30;8" 
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="19; 8; 19"
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="15" y="19" width="6" height="8" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="8;30;8" 
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="19; 8; 19"
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="30" y="19" width="6" height="8" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="8;30;8"  
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="19; 8; 19"
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>
        <svg v-else-if="sizeLoader === 'large'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="48px" height="60px" viewBox="0 0 48 60" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="26" width="8" height="10" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="10;42;10" 
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="26; 10; 26"
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="20" y="26" width="8" height="10" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="10;42;10" 
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="26; 10; 26"
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="40" y="26" width="8" height="10" fill="#333">
                <animate attributeName="height" attributeType="XML"
                    values="10;42;10" 
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML"
                    values="26; 10; 26"
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'McvLoading',
        props: {
            size: {
                type: String,
                default: () => ('small'),
                validator: (value) => {
                    return ['small', 'middle', 'large'].indexOf(value) !== -1
                }
            }
        },
        data(){
            return {
                sizeLoader: this.size
            }
        }
    }
</script>

<style>
    .loader{
    margin: 0 0 2em;
    height: 100px;
    width: 100%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
    }
    svg path,
    svg rect{
    fill: #5CB85C;
    }
</style>