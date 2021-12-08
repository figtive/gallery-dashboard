<script lang="ts">
  export let onConfirm: () => void;
  const confirmHandler = () => onConfirm();
</script>

<div
  class="modal fade"
  id="deleteConfirmationModal"
  tabindex="-1"
  aria-labelledby="deleteModalTitle"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deleteModalTitle">Warning!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div class="modal-body">
        Are you sure you want to delete this object? This action cannot be reverted and will delete
        all relation that dependes to this object.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
        <button
          type="button"
          class="btn btn-danger"
          data-bs-dismiss="modal"
          on:click={confirmHandler}>Confirm</button
        >
      </div>
    </div>
  </div>
</div>
