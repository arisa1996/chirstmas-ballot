<template>
    <v-app id="app">
        <v-dialog
            v-model="state.showAnimate"
            width="80vw"
            persistent
            max-width="960px">
            <v-card>
                <v-btn :loading="!state.showClose" dark icon absolute @click="close" style="right: 5px; top: 5px">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <Ani v-if="state.showAnimate" :value="state.number"></Ani>
            </v-card>
        </v-dialog>
        <!-- 初始化 -->
        <v-card v-if="(state.started === false)" class="mx-auto pa-7 mt-10" max-width="600px" width="80vw">
            <v-form>
                <v-text-field outlined label="總遊玩人數" v-model="state.totalPlayer"></v-text-field>
                <v-text-field outlined label="銘謝惠顧數" v-model="state.failCount"></v-text-field>
                <v-btn color="success" block @click="start">開始抽籤</v-btn>
            </v-form>
        </v-card>
        <!-- 抽籤 -->
        <v-container v-else class="py-5">
            <input hidden v-model="state.barcode">
            <v-row justify="center">
                <v-col v-for="card in state.cards" :key="card.key" cols="auto">
                    <v-card
                        elevation="5"
                        height="150"
                        width="150"
                        style="position: relative;"
                        color="grey"
                        @click="showAnimate(card.key)">
                        <v-tooltip bottom :disabled="!(card.used && state.showAnimate === false)">
                            <template v-slot:activator="{ on, attrs }">
                                <div v-bind="attrs" v-on="on">
                                    <VueQrcode
                                        :class="{ 'card-used': card.used }"
                                        :width="150"
                                        :height="150"
                                        :value="card.key">
                                    </VueQrcode>
                                </div>
                            </template>
                            <span>{{ card.value >= 0 ? card.value + 1 : 'FAIL' }}</span>
                        </v-tooltip>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script lang="ts" setup>
import Ani from '@/ani.vue'
import VueQrcode from 'vue-qrcode'
import { flow } from 'power-helper'
import { shuffle } from 'd3-array'
import { reactive } from 'vue'
import { useScanner } from '@/scanner'

const scanner = useScanner()
const state = reactive({
    number: 0,
    totalPlayer: 1,
    failCount: 1,
    barcode: '',
    started: false,
    showClose: false,
    showAnimate: false,
    cards: [] as Array<{
        key: string
        used: boolean
        value: number
    }>
})

scanner.on('scan', ({ text }) => {
    showAnimate(text)
})

const showAnimate = (key: string) => {
    let card = state.cards.find(e => e.key === key)
    if (card && card.used === false) {
        card.used = true
        state.number = card.value
        state.showClose = false
        state.showAnimate = true
        setTimeout(() => {
            state.showClose = true
        }, 3000)
    }
}

const close = () => {
    state.number = 0
    state.showClose = false
    state.showAnimate = false
}

const start = () => {
    for (let i = 0; i < state.totalPlayer; i++) {
        state.cards.push({
            key: flow.createUuid(),
            used: false,
            value: i
        })
    }
    for (let i = 0; i < state.failCount; i++) {
        state.cards.push({
            key: flow.createUuid(),
            used: false,
            value: (i + 1) * -1
        })
    }
    state.started = true
    shuffle(state.cards)
}

</script>

<style lang="scss" scoped>
    #app {
        background-image: url(../public/images/bg.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }
    .card-used {
        opacity: 0.5;
    }
</style>
