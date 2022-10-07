<template>
    <div>
        <h3 style="text-align: left">Izmena obaveze</h3>
        <Header />
        <b-form @submit.stop.prevent="onSubmit">
            <b-form-group
                id="example-input-group-1"
                label="Kategorija:"
                label-for="example-input-1"
            >
                <b-form-input
                    id="example-input-1"
                    name="example-input-1"
                    v-model="$v.form.category.$model"
                    :state="validateState('category')"
                    aria-describedby="input-1-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-1-live-feedback"
                    >Kategorija mora imati najmanje 4 a najvise 18
                    karaktera.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-form-group
                id="example-input-group-2"
                label="Sadrzaj"
                label-for="example-input-2"
            >
                <b-form-textarea
                    id="example-input-2"
                    name="example-input-2"
                    v-model="$v.form.content.$model"
                    :state="validateState('content')"
                    aria-describedby="input-2-live-feedback"
                ></b-form-textarea>

                <b-form-invalid-feedback id="input-2-live-feedback"
                    >Neophodno je uneti sadrzaj.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-button-group
                ><b-button type="submit" variant="outline-success"
                    >Izmeni</b-button
                >
                <b-button @click="resetForm()" variant="outline-danger"
                    >Resetuj</b-button
                >
            </b-button-group>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import Header from "../components/Header";

export default {
    name: "Todo",
    components: {
        Header,
    },
    mixins: [validationMixin],
    data() {
        return {
            form: {
                category: null,
                content: null,
            },
            id: this.$route.params.id,
        };
    },
    validations: {
        form: {
            category: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(18),
            },
            content: {
                required,
            },
        },
    },
    computed: {
        ...mapState(["todos"]),
        todo: function() {
            for (let i = 0; i < this.todos.length; i++)
                if (this.todos[i].id === parseInt(this.$route.params.id))
                    return this.todos[i];
            return null;
        },
    },
    methods: {
        ...mapActions(["changeTodo"]),
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                this.makeToast(
                    "Neuspesno",
                    "Doslo je do greske prilikom izmene.",
                    "danger"
                );
                return;
            }
            this.changeTodo({ todo: this.form, id: this.id });
            this.makeToast(
                "Uspesno",
                "Uspesno ste izmenili obavezu!",
                "success"
            );
        },
        resetForm() {
            this.form = {
                category: this.todo.category,
                content: this.todo.content,
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
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
    mounted: function() {
        this.form.category = this.todo.category;
        this.form.content = this.todo.content;
    },
};
</script>

<style lang="scss" scoped></style>
