type IsFollowedType = {
    followed: boolean
}

export function updateObjectInArray<T, L1 extends keyof T>(items: T[], itemId: number, objPropName: L1, newObjProps: IsFollowedType): T[] {
    return items.map((u) => Number(u[objPropName]) === itemId ? {...u, ...newObjProps} : u)
}
