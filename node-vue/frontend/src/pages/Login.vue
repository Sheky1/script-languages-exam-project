<template>
    <div>
        <h3 style="text-align: left">Login</h3>
        <b-form @submit.stop.prevent="onSubmit">
            <b-form-group
                id="example-input-group-1"
                label="Username:"
                label-for="example-input-1"
            >
                <b-form-input
                    id="example-input-1"
                    name="example-input-1"
                    v-model="$v.form.username.$model"
                    :state="validateState('username')"
                    aria-describedby="input-1-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-1-live-feedback"
                    >Username mora imati najmanje 4 a najvise 30
                    karaktera.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-form-group
                id="example-input-group-2"
                label="Password:"
                label-for="example-input-2"
            >
                <b-form-input
                    id="example-input-2"
                    name="example-input-2"
                    type = "password"
                    v-model="$v.form.password.$model"
                    :state="validateState('password')"
                    aria-describedby="input-2-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-2-live-feedback"
                    >Password mora imati najmanje 4 a najvise 18
                    karaktera.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-button-group
                ><b-button type="submit" variant="outline-success"
                    >Login</b-button
                ><b-button href="/register" variant="outline-primary"
                    >Sign up</b-button
                >
            </b-button-group>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import router from "../router";

export default {
    name: "NewTodo",
    mixins: [validationMixin],
    data() {
        return {
            form: {
                username: null,
                password: null,
            },
        };
    },
    computed: {
        ...mapState(["user"]),
    },
    validations: {
        form: {
            username: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(30),
            },
            password: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(18),
            },
        },
    },
    methods: {
        ...mapActions(["login"]),
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                this.makeToast(
                    "Neuspesno",
                    "Doslo je do greske prilikom logina.",
                    "danger"
                );
                return;
            }
            this.login(this.form);
            setTimeout(() => {
                if (this.user.id != undefined) {
                    this.makeToast("Uspesno", "Dobrodosli!", "success");
                    router.push({ path: `/home` });
                } else {
                    this.makeToast(
                        "Neuspesno",
                        "Ne postoji korisnik sa takvim kredencijalima.",
                        "danger"
                    );
                }
            }, 100);
        },
        makeToast(title, text, variant, append = false) {
            this.$bvToast.toast(text, {
                title,
                autoHideDelay: 5000,
                variant,
                appendToast: append,
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
