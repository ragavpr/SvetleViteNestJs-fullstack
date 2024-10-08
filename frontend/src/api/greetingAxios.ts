import axios from 'axios'
import type { GreetingInterface } from '../interfaces'

export async function getCall(url: string) {
	try {
		const response = await axios.get(url)
		// console.log(response);
		if (response.status == 200) {
			// test for status you want, etc
			console.log(response.status)
		}
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export async function postNewGreeting(
	payload: GreetingInterface,
	endpoint: string = 'http://localhost:3001/rest-api'
) {
	try {
		//console.log(endpoint)
		const response = await axios.post(endpoint, payload)
		if (response.status == 201) {
			// test for status you want, etc
			console.log(response.status)
		}
		return response.data
	} catch (error) {
		console.error(error)
	}
}
export async function deleteGreeting(
	id: string,
	endpoint: string = 'http://localhost:3001/rest-api'
) {
	try {
		// console.log(id)
		const response = await axios.delete(`${endpoint}/${id}`)
		if (response.status == 200) {
			console.log(response.status)
		}
		return response.data
	} catch (error) {
		console.error(error)
	}
}
export async function patchGreeting(
	payload: GreetingInterface,
	endpoint: string = 'http://localhost:3001/rest-api'
) {
	try {
		// console.log(payload.id)
		const response = await axios.patch(`${endpoint}/${payload.id}`, {
			msg: payload.msg,
		})
		if (response.status == 200) {
			console.log(response.status)
		}
		return response.data
	} catch (error) {
		console.error(error)
	}
}
