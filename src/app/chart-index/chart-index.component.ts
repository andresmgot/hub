import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../shared/services/charts.service';
import { Chart } from '../shared/models/chart';
import { SeoService } from '../shared/services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-index',
  templateUrl: './chart-index.component.html',
  styleUrls: ['./chart-index.component.scss']
})
export class ChartIndexComponent implements OnInit {
  charts: Chart[];
  loading: boolean = true;
  totalPages: number = 1;
  page: number = 1;
  onSelect = (page: number) => this.onSelectPage(page);

  constructor(
    private chartsService: ChartsService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.loadCharts(this.page);
    this.seo.setMetaTags('index');
  }

  loadCharts(page?: number): void {
    this.chartsService.getCharts('all', page).subscribe(res => {
      this.loading = false;
      this.charts = res.charts;
      this.totalPages = res.meta.totalPages;
    });
  }

  onSelectPage(page: number) {
    this.page = page;
    this.loading = true;
    this.loadCharts(page);
  }
}
