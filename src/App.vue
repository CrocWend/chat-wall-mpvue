<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["appIMDelegate"])
  },
  onLaunch(options) {
    this.appIMDelegate.onLaunch(options);
  },
  onHide() {
    this.appIMDelegate.onHide();
  },
  onShow(options) {
  }
};
</script>
<style>
</style>
