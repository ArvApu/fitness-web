import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/MenuLinks.vue'

describe('MenuLinks.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
