import axios from 'axios';
import { mount } from '@vue/test-utils';
import { vi, expect, describe, it } from 'vitest';
import RequestList from '../../components/funcionalidad_2/RequestList.vue';

vi.mock('axios');

describe('RequestList', () => {
  it('Should return a mocked response in get API', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, title: "Test Task" }] });
    mount(RequestList);

    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos"
    );
  })

  it("Should render the elements in the list", async () => {
    const mockData = [
      { id: 1, title: "Test Task 1" },
      { id: 2, title: "Test Task 2" },
    ];
    axios.get.mockResolvedValue({ data: mockData });

    const wrapper = mount(RequestList);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(wrapper.findAllComponents({ name: "RequestItem" }).length).toBe(2);
  });
});