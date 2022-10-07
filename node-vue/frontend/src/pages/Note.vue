<template>
    <div>
        <h3 style="text-align: left">Izmena beleske</h3>
        <Header />
        <b-form @submit.stop.prevent="onSubmit">
            <b-form-group
                id="example-input-group-1"
                label="Naslov:"
                label-for="example-input-1"
            >
                <b-form-input
                    id="example-input-1"
                    name="example-input-1"
                    v-model="$v.form.title.$model"
                    :state="validateState('title')"
                    aria-describedby="input-1-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-1-live-feedback"
                    >Naslov mora imati najmanje 4 a najvise 30
                    karaktera.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-form-group
                id="example-input-group-2"
                label="Kategorija:"
                label-for="example-input-2"
            >
                <b-form-input
                    id="example-input-2"
                    name="example-input-2"
                    v-model="$v.form.category.$model"
                    :state="validateState('category')"
                    aria-describedby="input-2-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-2-live-feedback"
                    >Kategorija mora imati najmanje 4 a najvise 18
                    karaktera.</b-form-invalid-feedback
                >
            </b-form-group>

            <b-form-group
                id="example-input-group-3"
                label="Sadrzaj"
                label-for="example-input-3"
            >
                <b-form-textarea
                    id="example-input-3"
                    name="example-input-3"
                    v-model="$v.form.content.$model"
                    :state="validateState('content')"
                    aria-describedby="input-3-live-feedback"
                ></b-form-textarea>

                <b-form-invalid-feedback id="input-3-live-feedback"
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
    name: "Note",
    components: {
        Header,
    },
    mixins: [validationMixin],
    data() {
        return {
            form: {
                title: null,
                category: null,
                content: null,
            },
            id: this.$route.params.id,
            show: true,
        };
    },
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(30),
            },
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
        ...mapState(["notes"]),
        note: function() {
            for (let i = 0; i < this.notes.length; i++)
                if (this.notes[i].id === parseInt(this.$route.params.id))
                    return this.notes[i];
            return null;
        },
    },
    methods: {
        ...mapActions(["changeNote"]),
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
            this.changeNote({ note: this.form, id: this.id });
            this.makeToast(
                "Uspesno",
                "Uspesno ste izmenili obavezu!",
                "success"
            );
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                title: this.note.title,
                category: this.note.category,
                content: this.note.content,
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
        this.form.title = this.note.title;
        this.form.category = this.note.category;
        this.form.content = this.note.content;
    },
};
</script>

<style lang="scss" scoped></style>
