<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["appIMDelegate"])
  },
  onLaunch(options) {
    // console.log(options);
    // console.log("this");
    // console.log(this);
    // this.appIMDelegate = new AppIMDelegate(this);
    // console.log(this.appIMDelegate)
    this.appIMDelegate.onLaunch(options);
  },
  onHide() {
    this.appIMDelegate.onHide();
  },
  onShow(options) {
    // console.log("onShow");
    // console.log(this);
    // this.appIMDelegate.onShow(options);
  },
  methods: {
    // getIMHandler() {
    // return this.appIMDelegate.getIMHandlerDelegate();
    // },
    // getIMDelegate() {
    // return this.appIMDelegate;
    // },
  }
};
</script>
<style>
</style>
