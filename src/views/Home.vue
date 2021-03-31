<script lang="ts">
import Vue from 'vue';
import { logout } from '@/api/auth';
import { getUsers } from '@/api/user';
import { UserResponseDto } from '@/interfaces/IUser';
import { removeAccessToken } from '@/utils/auth';

interface Data {
  search: string;
  headers: Array<unknown>;
  users: UserResponseDto[];

  tableDataLoading: boolean;
}

export default Vue.extend({
  name: 'Home',

  data: () => ({
    fab: false,
    search: '',
    headers: [
      { text: 'ID 👾', value: 'id', sortable: false },
      { text: 'Username 🤖', value: 'username' },
      { text: 'Created At 🙉', value: 'createdAt' },
      { text: 'Updated At 🦁', value: 'updatedAt' },
    ],
    users: [],

    tableDataLoading: false,
  } as Data),

  async mounted() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      this.tableDataLoading = true;

      setTimeout(async () => {
        this.users = await getUsers();
        this.tableDataLoading = false;
      }, 500);
    },
    async handleLogout() {
      await logout();

      removeAccessToken();
      this.$router.push('/login');
    },
  },
});
</script>

<template>
  <main id="home">
    <v-row
      no-gutters
      align="center"
      style="height: 100%"
    >
      <v-container>
        <v-card
          dark
        >
          <v-card-title
            style="color: orange"
            class="flex-column align-start flex-md-row align-md-center"
          >
            Users 🦄
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            class="user-table pt-4"
            :loading="tableDataLoading"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="users"
            :search="search"
            :sort-by="['username']"
            :sort-asc="[true]"
            dark
            locale="en-US"
            height="420px"
          />
        </v-card>
      </v-container>

      <v-speed-dial
        v-model="fab"
        absolute
        :top="false"
        :bottom="true"
        :right="true"
        :left="false"
        direction="top"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="orange darken-1"
            dark
            fab
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="red"
          @click="handleLogout"
        >
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-row>
  </main>
</template>

<style lang="scss" scoped>
#home {
  background: #28282b;
  height: 100%;

  .user-table.v-data-table::v-deep {
    .v-data-table__wrapper {
      .v-data-table-header {
        th {
          span {
            color: orange;
          }
        }
      }
    }
  }
}
</style>
