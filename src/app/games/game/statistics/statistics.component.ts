import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { WsService } from '../../../shared/services/ws.service';

@Component({
    selector: 'app-game-statistics',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgxEchartsDirective,
    ],
    templateUrl: './statistics.component.html',
    providers: [
        provideEcharts(),
    ]
})
export class GameStatisticsComponent implements OnInit {

    @Input() game: any;

    options: EChartsOption = {};

    constructor(
        private _httpClient: HttpClient,
        private _wsService: WsService,
    ) { }

    ngOnInit(): void {
        this.loadOptions();
    }

    loadOptions(): void {
        const fileName = 'bg-court.svg';
        this._httpClient.get('/assets/images/' + fileName, { responseType: 'text' }).subscribe(value => {
            echarts.registerMap(fileName, { svg: value });
            this.options = {
                geo: {
                    map: fileName,
                    roam: true,
                },
                series: [
                    {
                        name: 'Route',
                        type: 'lines',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        emphasis: {
                            label: {
                                show: false
                            }
                        },
                        polyline: true,
                        lineStyle: {
                            color: '#c46e54',
                            width: 5,
                            opacity: 1,
                            type: 'dotted'
                        },
                        effect: {
                            show: true,
                            period: 8,
                            color: '#a10000',
                            constantSpeed: 80,
                            trailLength: 0,
                            symbolSize: [20, 12],
                            symbol:
                                'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'
                        },
                        data: [
                            {
                                coords: [
                                    [200, 100],
                                    [150, 120],
                                    [120, 125],
                                    [100, 170]
                                ]
                            }
                        ]
                    }
                ]
            };
        });
    }

    testPython(): void {
        this._wsService.wsCall('test-python', { parametroUno: 2, parametroDue: 5 }).subscribe({
            next: (r) => {
                alert('Python dice: ' + JSON.stringify(r));
            },
            error: (e) => {

            }
        });
    }

}
