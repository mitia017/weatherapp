import { ref, watch, unref, onScopeDispose } from 'vue';

export function useDebounce(source, delay = 300) {
  const debounced = ref(unref(source));
  let timeoutId;

  const stop = watch(
    source,
    (value) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        debounced.value = value;
      }, delay);
    },
    { immediate: true }
  );

  onScopeDispose(() => {
    clearTimeout(timeoutId);
    stop();
  });

  return debounced;
}
