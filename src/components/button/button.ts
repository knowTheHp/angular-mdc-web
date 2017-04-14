﻿import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	HostBinding,
	Renderer2,
	ViewEncapsulation
} from '@angular/core';

import { Ripple } from '../ripple/ripple';

const MDC_BUTTON_STYLES = require('@material/button/mdc-button.scss');

@Component({
	selector: 'mdc-button',
	styles: [String(MDC_BUTTON_STYLES)],
	template: '<ng-content></ng-content>',
	encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements AfterViewInit, OnDestroy {
	@Input() raised: boolean = false; /* usage [raised]="true" */
	@Input() primary: boolean = false;
	@Input() dense: boolean = false;
	@Input() compact: boolean = false;
	@Input() accent: boolean = false;
	@HostBinding('class') className: string = 'mdc-button';
	@HostBinding('class.mdc-button--raised') get classRaised(): string {
		return this.raised ? 'mdc-button--raised' : '';
	}
	@HostBinding('class.mdc-button--primary') get classPrimary(): string {
		return this.primary ? 'mdc-button--primary' : '';
	}
	@HostBinding('class.mdc-button--accent') get classAccent(): string {
		return this.accent ? 'mdc-button--accent' : '';
	}
	@HostBinding('class.mdc-button--dense') get classDense(): string {
		return this.dense ? 'mdc-button--dense' : '';
	}
	@HostBinding('class.mdc-button--compact') get classCompact(): string {
		return this.compact ? 'mdc-button--compact' : '';
	}

	private _ripple: any;

	constructor(private _renderer: Renderer2, private _root: ElementRef) { }

	ngAfterViewInit() {
		this._ripple = new Ripple(this._renderer, this._root);
		this._ripple.rippleFoundation.init();
	}
	ngOnDestroy() {
		this._ripple.rippleFoundation.destroy();
	}
}