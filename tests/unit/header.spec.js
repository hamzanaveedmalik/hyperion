import Header from '@/components/Header.vue'
import { shallowMount } from '@vue/test-utils'


describe('Header.vue', () => {
    it('renders props.name when passed', () => {
        const name = 'Hamza'
        const wrapper = shallowMount(Header, {
            propsData: { name }
        })
        expect(wrapper.text()).toMatch(name)
    })
}) 