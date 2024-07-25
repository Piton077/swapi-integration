import "reflect-metadata";
const formatMetadataKey = Symbol("Translatable");
export function Translatable() {
    return Reflect.metadata(formatMetadataKey, 'public');
}
export function isTranslatable(target: any, propertyKey: string) {
    const resp = Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    return !!resp
}


