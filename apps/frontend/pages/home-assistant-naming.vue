<template>
  <div class="home-assistant-naming">
    <UiFormNaiveSelect v-model:value="type" :options="typeSelectOption" />
    <UiFormNaiveForm
      v-if="type === HomeAssistantDataType.device"
      v-model:form-model="deviceFormModel"
      :form-options="formConfig"
      @submit="onSubmit"
    />
    <UiFormNaiveForm
      v-else-if="type === HomeAssistantDataType.automatization"
      v-model:form-model="automatizationFormModel"
      :form-options="formConfig"
      @submit="onSubmit"
    />
    <div>
      <div
        v-for="(naming, index) in homeAssistantNamings"
        :key="`${index}_${naming}`"
      >
        {{ naming.homeAssistantName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { SelectOptionUi } from '@daily-helper/ui/lib/components/form/NaiveSelect.vue'
import { HomeAssistantDataType } from '~/composables/homeAssistantNaming'
import type { FormConfig } from '@daily-helper/ui/lib/components/form/NaiveForm.vue'
import {
  HomeAssistantDeviceManufacturer,
  HomeAssistantRoom,
} from '~/config/homeAssistant'
import { ElementType } from '@daily-helper/ui/lib/components/form/NaiveForm.vue'
import { useHomeAssistatntNamingStore } from '~/store/homeAssistatntNaming'

const typeSelectOption: SelectOptionUi[] = [
  { label: 'Device', value: HomeAssistantDataType.device },
  { label: 'Automatization', value: HomeAssistantDataType.automatization },
]

const getElementsForDeviceType = (): FormConfig['elements'] => {
  return [
    {
      elementType: ElementType.Select,
      span: '14 s:24 m:4 l:4 xl:4',
      id: 'manufacturer',
      label: 'Vyrobca',
      path: 'manufacturer',
      options: [
        { label: 'Aqara', value: HomeAssistantDeviceManufacturer.aqara },
        {
          label: 'BlitzWolf',
          value: HomeAssistantDeviceManufacturer.blitzwolf,
        },
        { label: 'Hue', value: HomeAssistantDeviceManufacturer.hue },
      ],
    },
    {
      elementType: ElementType.Select,
      span: '14 s:24 m:4 l:4 xl:4',
      id: 'room',
      label: 'Izba',
      path: 'room',
      options: [
        { label: 'Bedroom', value: HomeAssistantRoom.bedroom },
        {
          label: 'Bathroom',
          value: HomeAssistantRoom.bathroom,
        },
        { label: 'Kitchen', value: HomeAssistantRoom.kitchen },
        { label: 'Living Room', value: HomeAssistantRoom.livingRoom },
        { label: 'Hall', value: HomeAssistantRoom.hall },
      ],
    },
    {
      elementType: ElementType.TextInput,
      span: '14 s:24 m:16 l:16 xl:16',
      id: 'deviceType',
      label: 'Typ zariadenia',
      path: 'deviceType',
    },
    {
      elementType: ElementType.Button,
      id: 'submit',
      buttonContent: 'Odeslat',
      span: '24 s:24 m:4 l:4 xl:4',
    },
  ]
}

const getElementsForAutomatizationType = (): FormConfig['elements'] => {
  return [
    {
      elementType: ElementType.Select,
      span: '14 s:24 m:4 l:4 xl:4',
      id: 'room',
      label: 'Izba',
      path: 'room',
      options: [
        { label: 'Bedroom', value: HomeAssistantRoom.bedroom },
        {
          label: 'Bathroom',
          value: HomeAssistantRoom.bathroom,
        },
        { label: 'Kitchen', value: HomeAssistantRoom.kitchen },
        { label: 'Living Room', value: HomeAssistantRoom.livingRoom },
        { label: 'Hall', value: HomeAssistantRoom.hall },
      ],
    },
    {
      elementType: ElementType.TextInput,
      span: '14 s:24 m:16 l:16 xl:16',
      id: 'trigger',
      label: 'Trigger',
      path: 'trigger',
    },
    {
      elementType: ElementType.TextInput,
      span: '14 s:24 m:16 l:16 xl:16',
      id: 'action',
      label: 'Action',
      path: 'action',
    },
    {
      elementType: ElementType.Button,
      id: 'submit',
      buttonContent: 'Odeslat',
      span: '24 s:24 m:4 l:4 xl:4',
    },
  ]
}

const getFormConfig = (type: HomeAssistantDataType): FormConfig => ({
  rules: {
    sentence: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Popis je povinny!',
    },
  },
  gridOptions: {
    span: 24,
    xGap: 20,
    yGap: 0,
  },

  elements:
    type === HomeAssistantDataType.device
      ? getElementsForDeviceType()
      : getElementsForAutomatizationType(),
})

export default defineComponent({
  setup() {
    const homeAssistantNamingStore = useHomeAssistatntNamingStore()
    const { homeAssistantNamings } = storeToRefs(homeAssistantNamingStore)
    const type = ref<HomeAssistantDataType>(HomeAssistantDataType.device)
    const formConfig = computed(() => getFormConfig(type.value))
    const { createNamingForHomeAssistance } = useHomeAssistantNaming()

    const deviceFormModel = ref({
      manufacturer: HomeAssistantDeviceManufacturer.aqara,
      room: HomeAssistantRoom.bedroom,
      deviceType: '',
    })

    const automatizationFormModel = ref({
      room: HomeAssistantRoom.bedroom,
      trigger: '',
      action: '',
    })

    const clearModels = () => {
      deviceFormModel.value = {
        manufacturer: HomeAssistantDeviceManufacturer.aqara,
        room: HomeAssistantRoom.bedroom,
        deviceType: '',
      }
      automatizationFormModel.value = {
        room: HomeAssistantRoom.bedroom,
        trigger: '',
        action: '',
      }
    }

    const onSubmit = () => {
      let result: string | null = null
      if (type.value === HomeAssistantDataType.device) {
        result = createNamingForHomeAssistance({
          type: HomeAssistantDataType.device,
          data: deviceFormModel.value,
        })
      } else {
        result = createNamingForHomeAssistance({
          type: HomeAssistantDataType.automatization,
          data: automatizationFormModel.value,
        })
      }
      result &&
        homeAssistantNamingStore.addToHomeAssistantNamings({
          type: type.value,
          homeAssistantName: result,
          date: new Date(),
        })
      clearModels()
    }

    onMounted(() => {
      homeAssistantNamingStore.initHomeAssistantNamings()
    })

    return {
      type,
      typeSelectOption,
      formConfig,
      deviceFormModel,
      automatizationFormModel,
      HomeAssistantDataType,
      onSubmit,
      homeAssistantNamings,
    }
  },
})
</script>

<style lang="scss" scoped>
.home-assistant-naming {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
