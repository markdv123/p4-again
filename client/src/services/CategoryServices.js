import ApiClient from './ApiClient'

export const __GetCategoriesByGame = async (gameId) => {
    try {
        const res = await ApiClient.get(`/categories/${gameId}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __CreateCategory = async (formData, gameId) => {
    try {
        const res = await ApiClient.post(`/categories/${gameId}/?active=true`, formData)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __UpdateCategory = async (formData, categoryId) => {
    try {
        const res = await ApiClient.put(`/categories/${categoryId}/?active=true`, formData)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __DeleteCategory = async (categoryId) => {
    try {
        const res = await ApiClient.delete(`/categories/${categoryId}/?active=true`)
        return res
    } catch (error) {
        throw error
    }
}