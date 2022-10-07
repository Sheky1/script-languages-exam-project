<template>
    <div>
        <h3 style="text-align: left">Sign up</h3>
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
                    >Kategorija mora imati najmanje 4 a najvise 18
                    karaktera.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-form-group
                id="example-input-group-2"
                label="Password"
                label-for="example-input-2"
            >
                <b-form-input
                    id="example-input-2"
                    name="example-input-2"
                    v-model="$v.form.password.$model"
                    :state="validateState('password')"
                    aria-describedby="input-2-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-2-live-feedback"
                    >Neophodno je uneti pw.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-button-group
                ><b-button type="submit" variant="outline-success"
                    >Sign up</b-button
                >
                <b-button @click="resetForm()" variant="outline-danger"
                    >Reset</b-button
                ><b-button href="/" variant="outline-primary"
                    >Back to login</b-button
                >
            </b-button-group>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

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
    validations: {
        form: {
            username: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(18),
            },
            password: {
                required,
            },
        },
    },
    methods: {
        ...mapActions(["register"]),
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                username: null,
                password: null,
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        onSubmit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                this.makeToast(
                    "Neuspesno",
                    "Doslo je do greske prilikom dodavanja.",
                    "danger"
                );
                return;
            }
            this.register(this.form);
            this.makeToast("Uspesno", "Uspesno ste dodali obavezu!", "success");
            this.resetForm();
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
