import ApiClient from './ApiClient'

export const __GetGames = async () => {
    try {
        const res = await ApiClient.get(`/games/`)
        return res.data
    } catch (err) {
        throw err
    }
}

export const __GetGamesByUser = async (userId) => {
    try {
        const res = await ApiClient.get(`/games/by/${userId}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __GetGameById = async (gameId) => {
    try {
        const res = await ApiClient.get(`/games/${gameId}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __CreateGame = async (formData, userId) => {
    try {
        const res = await ApiClient.post(`/games/${userId}/?active=true`, formData)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __UpdateGame = async (formData, gameId) => {
    try {
        const res = await ApiClient.put(`/games/${gameId}/?active=true`, formData)
        return res.data
    } catch (error) {
        throw error
    }
}

export const __DeleteGame = async (gameId) => {
    try {
        const res = await ApiClient.delete(`/games/${gameId}/?active=true`)
        return res
    } catch (error) {
        throw error
    }
}