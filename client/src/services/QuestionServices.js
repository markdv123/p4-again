import ApiClient from './ApiClient'

export const __GetQuestionsByCategory = async (categoryId) => {
    try {
        const res = await ApiClient.get(`/questions/${categoryId}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __CreateQuestion = async (formData, categoryId) => {
    try {
        const res = await ApiClient.post(`/questions/${categoryId}/?active=true`, formData)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __UpdateQuestion = async (formData, questionId) => {
    try {
        const res = await ApiClient.put(`/questions/${questionId}/?active=true`, formData)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __DeleteQuestion = async (questionId) => {
    try {
        const res = await ApiClient.delete(`/questions/${questionId}/?active=true`)
        return res
    } catch (error) {
        throw error
    }
}