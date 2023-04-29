<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <v-card>
                    <v-img
                    class="white--text"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    
                    </v-img>
                    <v-card-title>
                        <v-container fill-height fluid>
                        <v-row fill-height>
                        <v-col xs12 align-end flexbox>
                            <span class="headline">Top 10 Australian beaches</span>
                        </v-col>
                        </v-row>
                    </v-container>
                        <v-slide-y-transition>
                            <v-card-text v-show="show">
                                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </v-slide-y-transition>
                    </v-card-title>
                    <v-card-actions justify="end">
                        <v-btn flat color="orange">토론</v-btn>
                        <v-btn flat>
                            <v-icon>thumb_up</v-icon>
                        </v-btn>
                        <v-btn flat>
                            <v-icon>thumb_down</v-icon>
                        </v-btn>
                        <v-btn icon @click="show = !show" justify="end">
                            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      show: false
    })
  }
</script>