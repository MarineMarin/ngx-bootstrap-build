import { Injectable, EventEmitter, RendererFactory2, Inject, Optional } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { CLASS_NAME, modalConfigDefaults, ModalOptions, TRANSITION_DURATIONS, MODAL_CONFIG_DEFAULT_OVERRIDE } from './modal-options.class';
import { BsModalRef } from './bs-modal-ref.service';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./modal-options.class";
let currentId = 1;
export class BsModalService {
    constructor(rendererFactory, clf, modalDefaultOption) {
        this.clf = clf;
        this.modalDefaultOption = modalDefaultOption;
        this.onShow = new EventEmitter();
        this.onShown = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onHidden = new EventEmitter();
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.modalsCount = 0;
        this.loaders = [];
        this._backdropLoader = this.clf.createLoader();
        this._renderer = rendererFactory.createRenderer(null, null);
        this.config = modalDefaultOption ?
            (Object.assign({}, modalConfigDefaults, modalDefaultOption)) :
            modalConfigDefaults;
    }
    /** Shows a modal */
    show(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content, config) {
        this.modalsCount++;
        this._createLoaders();
        // must be different per every show() call
        const id = config?.id || currentId++;
        this.config = this.modalDefaultOption ?
            Object.assign({}, modalConfigDefaults, this.modalDefaultOption, config) :
            Object.assign({}, modalConfigDefaults, config);
        this.config.id = id;
        this._showBackdrop();
        this.lastDismissReason = void 0;
        return this._showModal(content);
    }
    hide(id) {
        if (this.modalsCount === 1 || id == null) {
            this._hideBackdrop();
            this.resetScrollbar();
        }
        this.modalsCount = this.modalsCount >= 1 && id != null ? this.modalsCount - 1 : 0;
        setTimeout(() => {
            this._hideModal(id);
            this.removeLoaders(id);
        }, this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0);
    }
    _showBackdrop() {
        const isBackdropEnabled = this.config.backdrop === true || this.config.backdrop === 'static';
        const isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;
        if (this.modalsCount === 1) {
            this.removeBackdrop();
            if (isBackdropEnabled && isBackdropInDOM) {
                this._backdropLoader
                    .attach(ModalBackdropComponent)
                    .to('body')
                    .show({ isAnimated: this.config.animated });
                this.backdropRef = this._backdropLoader._componentRef;
            }
        }
    }
    _hideBackdrop() {
        if (!this.backdropRef) {
            return;
        }
        this.backdropRef.instance.isShown = false;
        const duration = this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0;
        setTimeout(() => this.removeBackdrop(), duration);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _showModal(content) {
        const modalLoader = this.loaders[this.loaders.length - 1];
        if (this.config && this.config.providers) {
            for (const provider of this.config.providers) {
                modalLoader.provide(provider);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bsModalRef = new BsModalRef();
        const modalContainerRef = modalLoader
            .provide({ provide: ModalOptions, useValue: this.config })
            .provide({ provide: BsModalRef, useValue: bsModalRef })
            .attach(ModalContainerComponent)
            .to('body');
        bsModalRef.hide = () => modalContainerRef.instance?.hide();
        bsModalRef.setClass = (newClass) => {
            if (modalContainerRef.instance) {
                modalContainerRef.instance.config.class = newClass;
            }
        };
        bsModalRef.onHidden = new EventEmitter();
        bsModalRef.onHide = new EventEmitter();
        this.copyEvent(modalLoader.onBeforeHide, bsModalRef.onHide);
        this.copyEvent(modalLoader.onHidden, bsModalRef.onHidden);
        // call 'show' method after assign setClass in bsModalRef.
        // it makes modal component's bsModalRef available to call setClass method
        modalContainerRef.show({
            content,
            isAnimated: this.config.animated,
            initialState: this.config.initialState,
            bsModalService: this,
            id: this.config.id
        });
        if (modalContainerRef.instance) {
            modalContainerRef.instance.level = this.getModalsCount();
            bsModalRef.content = modalLoader.getInnerComponent();
            bsModalRef.id = modalContainerRef.instance.config?.id;
        }
        return bsModalRef;
    }
    _hideModal(id) {
        if (id != null) {
            const indexToRemove = this.loaders.findIndex(loader => loader.instance?.config.id === id);
            const modalLoader = this.loaders[indexToRemove];
            if (modalLoader) {
                modalLoader.hide(id);
            }
        }
        else {
            this.loaders.forEach((loader) => {
                if (loader.instance) {
                    loader.hide(loader.instance.config.id);
                }
            });
        }
    }
    getModalsCount() {
        return this.modalsCount;
    }
    setDismissReason(reason) {
        this.lastDismissReason = reason;
    }
    removeBackdrop() {
        this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
        this._renderer.setStyle(document.body, 'overflow-y', '');
        this._backdropLoader.hide();
        this.backdropRef = void 0;
    }
    /** Checks if the body is overflowing and sets scrollbar width */
    /** @internal */
    checkScrollbar() {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    }
    setScrollbar() {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || '0', 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = `${this.originalBodyPadding +
                this.scrollbarWidth}px`;
        }
    }
    resetScrollbar() {
        document.body.style.paddingRight = `${this.originalBodyPadding}px`;
    }
    // thx d.walsh
    getScrollbarWidth() {
        const scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    }
    _createLoaders() {
        const loader = this.clf.createLoader();
        this.copyEvent(loader.onBeforeShow, this.onShow);
        this.copyEvent(loader.onShown, this.onShown);
        this.copyEvent(loader.onBeforeHide, this.onHide);
        this.copyEvent(loader.onHidden, this.onHidden);
        this.loaders.push(loader);
    }
    removeLoaders(id) {
        if (id != null) {
            const indexToRemove = this.loaders.findIndex(loader => loader.instance?.config.id === id);
            if (indexToRemove >= 0) {
                this.loaders.splice(indexToRemove, 1);
                this.loaders.forEach((loader, i) => {
                    if (loader.instance) {
                        loader.instance.level = i + 1;
                    }
                });
            }
        }
        else {
            this.loaders.splice(0, this.loaders.length);
        }
    }
    copyEvent(from, to) {
        from.subscribe((data) => {
            to.emit(this.lastDismissReason || data);
        });
    }
}
BsModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsModalService, deps: [{ token: i0.RendererFactory2 }, { token: i1.ComponentLoaderFactory }, { token: MODAL_CONFIG_DEFAULT_OVERRIDE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
BsModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsModalService, providedIn: 'platform' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsModalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }, { type: i1.ComponentLoaderFactory }, { type: i2.ModalOptions, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MODAL_CONFIG_DEFAULT_OVERRIDE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtbW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RhbC9icy1tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxVQUFVLEVBRVYsWUFBWSxFQUVaLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQ0wsVUFBVSxFQUNWLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLDZCQUE2QixFQUM5QixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUVwRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFHbEIsTUFBTSxPQUFPLGNBQWM7SUF1QnpCLFlBQ0UsZUFBaUMsRUFDekIsR0FBMkIsRUFDd0Isa0JBQWdDO1FBRG5GLFFBQUcsR0FBSCxHQUFHLENBQXdCO1FBQ3dCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBYztRQXRCN0YsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQUV4QixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUlyQixnQkFBVyxHQUFHLENBQUMsQ0FB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LENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2xCLENBQUMsTUFBZ0QsRUFBRSxDQUFTLEVBQUUsRUFBRTtvQkFDOUQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO3dCQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMvQjtnQkFDSCxDQUFDLENBQ0YsQ0FBQzthQUNIO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxJQUEyQixFQUFFLEVBQXlCO1FBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzJHQXJQVSxjQUFjLHdGQTBCSCw2QkFBNkI7K0dBMUJ4QyxjQUFjLGNBREYsVUFBVTsyRkFDdEIsY0FBYztrQkFEMUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUM7OzBCQTJCL0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3RhYmxlLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlcjIsXHJcbiAgUmVuZGVyZXJGYWN0b3J5MixcclxuICBJbmplY3QsXHJcbiAgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlcic7XHJcbmltcG9ydCB7IE1vZGFsQmFja2Ryb3BDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBDTEFTU19OQU1FLFxyXG4gIG1vZGFsQ29uZmlnRGVmYXVsdHMsXHJcbiAgTW9kYWxPcHRpb25zLFxyXG4gIFRSQU5TSVRJT05fRFVSQVRJT05TLFxyXG4gIE1PREFMX0NPTkZJR19ERUZBVUxUX09WRVJSSURFXHJcbn0gZnJvbSAnLi9tb2RhbC1vcHRpb25zLmNsYXNzJztcclxuaW1wb3J0IHsgQnNNb2RhbFJlZiB9IGZyb20gJy4vYnMtbW9kYWwtcmVmLnNlcnZpY2UnO1xyXG5cclxubGV0IGN1cnJlbnRJZCA9IDE7XHJcblxyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3BsYXRmb3JtJ30pXHJcbmV4cG9ydCBjbGFzcyBCc01vZGFsU2VydmljZSB7XHJcbiAgLy8gY29uc3RydWN0b3IgcHJvcHNcclxuICBjb25maWc6IE1vZGFsT3B0aW9ucztcclxuXHJcbiAgb25TaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIG9uU2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgb25IaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIG9uSGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcm90ZWN0ZWQgaXNCb2R5T3ZlcmZsb3dpbmcgPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgb3JpZ2luYWxCb2R5UGFkZGluZyA9IDA7XHJcblxyXG4gIHByb3RlY3RlZCBzY3JvbGxiYXJXaWR0aCA9IDA7XHJcblxyXG4gIHByb3RlY3RlZCBiYWNrZHJvcFJlZj86IENvbXBvbmVudFJlZjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PjtcclxuICBwcml2YXRlIF9iYWNrZHJvcExvYWRlcjogQ29tcG9uZW50TG9hZGVyPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+O1xyXG4gIHByaXZhdGUgbW9kYWxzQ291bnQgPSAwO1xyXG4gIHByaXZhdGUgbGFzdERpc21pc3NSZWFzb24/OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgbG9hZGVyczogQ29tcG9uZW50TG9hZGVyPE1vZGFsQ29udGFpbmVyQ29tcG9uZW50PltdID0gW107XHJcblxyXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxyXG4gICAgcHJpdmF0ZSBjbGY6IENvbXBvbmVudExvYWRlckZhY3RvcnksXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1PREFMX0NPTkZJR19ERUZBVUxUX09WRVJSSURFKSBwcml2YXRlIG1vZGFsRGVmYXVsdE9wdGlvbjogTW9kYWxPcHRpb25zKSB7XHJcbiAgICB0aGlzLl9iYWNrZHJvcExvYWRlciA9IHRoaXMuY2xmLmNyZWF0ZUxvYWRlcjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PigpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XHJcbiAgICB0aGlzLmNvbmZpZyA9IG1vZGFsRGVmYXVsdE9wdGlvbiA/XHJcbiAgICAgIChPYmplY3QuYXNzaWduKHt9LCBtb2RhbENvbmZpZ0RlZmF1bHRzLCBtb2RhbERlZmF1bHRPcHRpb24pKSA6XHJcbiAgICAgIG1vZGFsQ29uZmlnRGVmYXVsdHM7XHJcbiAgfVxyXG5cclxuICAvKiogU2hvd3MgYSBtb2RhbCAqL1xyXG4gIHNob3c8VD4oXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IHsgbmV3KC4uLmFyZ3M6IGFueVtdKTogVCB9LFxyXG4gICAgY29uZmlnPzogTW9kYWxPcHRpb25zPFQ+XHJcbiAgKTogQnNNb2RhbFJlZjxUPiB7XHJcbiAgICB0aGlzLm1vZGFsc0NvdW50Kys7XHJcbiAgICB0aGlzLl9jcmVhdGVMb2FkZXJzKCk7XHJcblxyXG4gICAgLy8gbXVzdCBiZSBkaWZmZXJlbnQgcGVyIGV2ZXJ5IHNob3coKSBjYWxsXHJcbiAgICBjb25zdCBpZCA9IGNvbmZpZz8uaWQgfHwgY3VycmVudElkKys7XHJcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMubW9kYWxEZWZhdWx0T3B0aW9uID9cclxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgbW9kYWxDb25maWdEZWZhdWx0cywgdGhpcy5tb2RhbERlZmF1bHRPcHRpb24sIGNvbmZpZykgOlxyXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCBtb2RhbENvbmZpZ0RlZmF1bHRzLCBjb25maWcpO1xyXG4gICAgdGhpcy5jb25maWcuaWQgPSBpZDtcclxuICAgIHRoaXMuX3Nob3dCYWNrZHJvcCgpO1xyXG4gICAgdGhpcy5sYXN0RGlzbWlzc1JlYXNvbiA9IHZvaWQgMDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd01vZGFsPFQ+KGNvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgaGlkZShpZD86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMubW9kYWxzQ291bnQgPT09IDEgfHwgaWQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9oaWRlQmFja2Ryb3AoKTtcclxuICAgICAgdGhpcy5yZXNldFNjcm9sbGJhcigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RhbHNDb3VudCA9IHRoaXMubW9kYWxzQ291bnQgPj0gMSAmJiBpZCAhPSBudWxsID8gdGhpcy5tb2RhbHNDb3VudCAtIDEgOiAwO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVNb2RhbChpZCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlTG9hZGVycyhpZCk7XHJcbiAgICB9LCB0aGlzLmNvbmZpZy5hbmltYXRlZCA/IFRSQU5TSVRJT05fRFVSQVRJT05TLkJBQ0tEUk9QIDogMCk7XHJcbiAgfVxyXG5cclxuICBfc2hvd0JhY2tkcm9wKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaXNCYWNrZHJvcEVuYWJsZWQgPVxyXG4gICAgICB0aGlzLmNvbmZpZy5iYWNrZHJvcCA9PT0gdHJ1ZSB8fCB0aGlzLmNvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYyc7XHJcbiAgICBjb25zdCBpc0JhY2tkcm9wSW5ET00gPVxyXG4gICAgICAhdGhpcy5iYWNrZHJvcFJlZiB8fCAhdGhpcy5iYWNrZHJvcFJlZi5pbnN0YW5jZS5pc1Nob3duO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsc0NvdW50ID09PSAxKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQmFja2Ryb3AoKTtcclxuXHJcbiAgICAgIGlmIChpc0JhY2tkcm9wRW5hYmxlZCAmJiBpc0JhY2tkcm9wSW5ET00pIHtcclxuICAgICAgICB0aGlzLl9iYWNrZHJvcExvYWRlclxyXG4gICAgICAgICAgLmF0dGFjaChNb2RhbEJhY2tkcm9wQ29tcG9uZW50KVxyXG4gICAgICAgICAgLnRvKCdib2R5JylcclxuICAgICAgICAgIC5zaG93KHsgaXNBbmltYXRlZDogdGhpcy5jb25maWcuYW5pbWF0ZWQgfSk7XHJcbiAgICAgICAgdGhpcy5iYWNrZHJvcFJlZiA9IHRoaXMuX2JhY2tkcm9wTG9hZGVyLl9jb21wb25lbnRSZWY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9oaWRlQmFja2Ryb3AoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuYmFja2Ryb3BSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYWNrZHJvcFJlZi5pbnN0YW5jZS5pc1Nob3duID0gZmFsc2U7XHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuY29uZmlnLmFuaW1hdGVkID8gVFJBTlNJVElPTl9EVVJBVElPTlMuQkFDS0RST1AgOiAwO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZUJhY2tkcm9wKCksIGR1cmF0aW9uKTtcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBfc2hvd01vZGFsPFQ+KGNvbnRlbnQ6IGFueSk6IEJzTW9kYWxSZWY8VD4ge1xyXG4gICAgY29uc3QgbW9kYWxMb2FkZXIgPSB0aGlzLmxvYWRlcnNbdGhpcy5sb2FkZXJzLmxlbmd0aCAtIDFdO1xyXG4gICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnByb3ZpZGVycykge1xyXG4gICAgICBmb3IgKGNvbnN0IHByb3ZpZGVyIG9mIHRoaXMuY29uZmlnLnByb3ZpZGVycykge1xyXG4gICAgICAgIG1vZGFsTG9hZGVyLnByb3ZpZGUocHJvdmlkZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGNvbnN0IGJzTW9kYWxSZWYgPSBuZXcgQnNNb2RhbFJlZjxhbnk+KCk7XHJcbiAgICBjb25zdCBtb2RhbENvbnRhaW5lclJlZiA9IG1vZGFsTG9hZGVyXHJcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogTW9kYWxPcHRpb25zLCB1c2VWYWx1ZTogdGhpcy5jb25maWcgfSlcclxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBCc01vZGFsUmVmLCB1c2VWYWx1ZTogYnNNb2RhbFJlZiB9KVxyXG4gICAgICAuYXR0YWNoKE1vZGFsQ29udGFpbmVyQ29tcG9uZW50KVxyXG4gICAgICAudG8oJ2JvZHknKTtcclxuICAgIGJzTW9kYWxSZWYuaGlkZSA9ICgpID0+IG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlPy5oaWRlKCk7XHJcbiAgICBic01vZGFsUmVmLnNldENsYXNzID0gKG5ld0NsYXNzOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlKSB7XHJcbiAgICAgICAgbW9kYWxDb250YWluZXJSZWYuaW5zdGFuY2UuY29uZmlnLmNsYXNzID0gbmV3Q2xhc3M7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgYnNNb2RhbFJlZi5vbkhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dW5rbm93bj4oKTtcclxuICAgIGJzTW9kYWxSZWYub25IaWRlID0gbmV3IEV2ZW50RW1pdHRlcjx1bmtub3duPigpO1xyXG5cclxuICAgIHRoaXMuY29weUV2ZW50KG1vZGFsTG9hZGVyLm9uQmVmb3JlSGlkZSwgYnNNb2RhbFJlZi5vbkhpZGUpO1xyXG4gICAgdGhpcy5jb3B5RXZlbnQobW9kYWxMb2FkZXIub25IaWRkZW4sIGJzTW9kYWxSZWYub25IaWRkZW4pO1xyXG4gICAgLy8gY2FsbCAnc2hvdycgbWV0aG9kIGFmdGVyIGFzc2lnbiBzZXRDbGFzcyBpbiBic01vZGFsUmVmLlxyXG4gICAgLy8gaXQgbWFrZXMgbW9kYWwgY29tcG9uZW50J3MgYnNNb2RhbFJlZiBhdmFpbGFibGUgdG8gY2FsbCBzZXRDbGFzcyBtZXRob2RcclxuICAgIG1vZGFsQ29udGFpbmVyUmVmLnNob3coe1xyXG4gICAgICBjb250ZW50LFxyXG4gICAgICBpc0FuaW1hdGVkOiB0aGlzLmNvbmZpZy5hbmltYXRlZCxcclxuICAgICAgaW5pdGlhbFN0YXRlOiB0aGlzLmNvbmZpZy5pbml0aWFsU3RhdGUsXHJcbiAgICAgIGJzTW9kYWxTZXJ2aWNlOiB0aGlzLFxyXG4gICAgICBpZDogdGhpcy5jb25maWcuaWRcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChtb2RhbENvbnRhaW5lclJlZi5pbnN0YW5jZSkge1xyXG4gICAgICBtb2RhbENvbnRhaW5lclJlZi5pbnN0YW5jZS5sZXZlbCA9IHRoaXMuZ2V0TW9kYWxzQ291bnQoKTtcclxuICAgICAgYnNNb2RhbFJlZi5jb250ZW50ID0gbW9kYWxMb2FkZXIuZ2V0SW5uZXJDb21wb25lbnQoKTtcclxuICAgICAgYnNNb2RhbFJlZi5pZCA9IG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlLmNvbmZpZz8uaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJzTW9kYWxSZWY7XHJcbiAgfVxyXG5cclxuICBfaGlkZU1vZGFsKGlkPzogbnVtYmVyIHwgc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBpbmRleFRvUmVtb3ZlID0gdGhpcy5sb2FkZXJzLmZpbmRJbmRleChsb2FkZXIgPT4gbG9hZGVyLmluc3RhbmNlPy5jb25maWcuaWQgPT09IGlkKTtcclxuICAgICAgY29uc3QgbW9kYWxMb2FkZXIgPSB0aGlzLmxvYWRlcnNbaW5kZXhUb1JlbW92ZV07XHJcbiAgICAgIGlmIChtb2RhbExvYWRlcikge1xyXG4gICAgICAgIG1vZGFsTG9hZGVyLmhpZGUoaWQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvYWRlcnMuZm9yRWFjaChcclxuICAgICAgICAobG9hZGVyOiBDb21wb25lbnRMb2FkZXI8TW9kYWxDb250YWluZXJDb21wb25lbnQ+KSA9PiB7XHJcbiAgICAgICAgICBpZiAobG9hZGVyLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKGxvYWRlci5pbnN0YW5jZS5jb25maWcuaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE1vZGFsc0NvdW50KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RhbHNDb3VudDtcclxuICB9XHJcblxyXG4gIHNldERpc21pc3NSZWFzb24ocmVhc29uOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubGFzdERpc21pc3NSZWFzb24gPSByZWFzb247XHJcbiAgfVxyXG5cclxuICByZW1vdmVCYWNrZHJvcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIENMQVNTX05BTUUuT1BFTik7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnb3ZlcmZsb3cteScsICcnKTtcclxuICAgIHRoaXMuX2JhY2tkcm9wTG9hZGVyLmhpZGUoKTtcclxuICAgIHRoaXMuYmFja2Ryb3BSZWYgPSB2b2lkIDA7XHJcbiAgfVxyXG5cclxuICAvKiogQ2hlY2tzIGlmIHRoZSBib2R5IGlzIG92ZXJmbG93aW5nIGFuZCBzZXRzIHNjcm9sbGJhciB3aWR0aCAqL1xyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBjaGVja1Njcm9sbGJhcigpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNCb2R5T3ZlcmZsb3dpbmcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDwgd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5nZXRTY3JvbGxiYXJXaWR0aCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xyXG4gICAgaWYgKCFkb2N1bWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nID0gcGFyc2VJbnQoXHJcbiAgICAgIHdpbmRvd1xyXG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXHJcbiAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSB8fCAnMCcsXHJcbiAgICAgIDEwXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLmlzQm9keU92ZXJmbG93aW5nKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nICtcclxuICAgICAgICB0aGlzLnNjcm9sbGJhcldpZHRofXB4YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRTY3JvbGxiYXIoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMub3JpZ2luYWxCb2R5UGFkZGluZ31weGA7XHJcbiAgfVxyXG5cclxuICAvLyB0aHggZC53YWxzaFxyXG4gIHByaXZhdGUgZ2V0U2Nyb2xsYmFyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHNjcm9sbERpdiA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3Moc2Nyb2xsRGl2LCBDTEFTU19OQU1FLlNDUk9MTEJBUl9NRUFTVVJFUik7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCBzY3JvbGxEaXYpO1xyXG4gICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LCBzY3JvbGxEaXYpO1xyXG5cclxuICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZUxvYWRlcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmNsZi5jcmVhdGVMb2FkZXI8TW9kYWxDb250YWluZXJDb21wb25lbnQ+KCk7XHJcbiAgICB0aGlzLmNvcHlFdmVudChsb2FkZXIub25CZWZvcmVTaG93LCB0aGlzLm9uU2hvdyk7XHJcbiAgICB0aGlzLmNvcHlFdmVudChsb2FkZXIub25TaG93biwgdGhpcy5vblNob3duKTtcclxuICAgIHRoaXMuY29weUV2ZW50KGxvYWRlci5vbkJlZm9yZUhpZGUsIHRoaXMub25IaWRlKTtcclxuICAgIHRoaXMuY29weUV2ZW50KGxvYWRlci5vbkhpZGRlbiwgdGhpcy5vbkhpZGRlbik7XHJcbiAgICB0aGlzLmxvYWRlcnMucHVzaChsb2FkZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVMb2FkZXJzKGlkPzogbnVtYmVyIHwgc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBpbmRleFRvUmVtb3ZlID0gdGhpcy5sb2FkZXJzLmZpbmRJbmRleChsb2FkZXIgPT4gbG9hZGVyLmluc3RhbmNlPy5jb25maWcuaWQgPT09IGlkKTtcclxuICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPj0gMCkge1xyXG4gICAgICAgIHRoaXMubG9hZGVycy5zcGxpY2UoaW5kZXhUb1JlbW92ZSwgMSk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXJzLmZvckVhY2goXHJcbiAgICAgICAgICAobG9hZGVyOiBDb21wb25lbnRMb2FkZXI8TW9kYWxDb250YWluZXJDb21wb25lbnQ+LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxvYWRlci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgIGxvYWRlci5pbnN0YW5jZS5sZXZlbCA9IGkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2FkZXJzLnNwbGljZSgwLCB0aGlzLmxvYWRlcnMubGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29weUV2ZW50KGZyb206IEV2ZW50RW1pdHRlcjx1bmtub3duPiwgdG86IEV2ZW50RW1pdHRlcjx1bmtub3duPikge1xyXG4gICAgZnJvbS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgICAgdG8uZW1pdCh0aGlzLmxhc3REaXNtaXNzUmVhc29uIHx8IGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==